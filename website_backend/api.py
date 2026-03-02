from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import numpy as np
import logging
import os
from datetime import datetime

# Torch / torchvision
import torch.nn as nn
from torchvision.models import efficientnet_b3, EfficientNet_B3_Weights
from torchvision import transforms

# Keras / TensorFlow (for hip model — InceptionV3 .h5)
import tensorflow as tf
from tensorflow.keras.models import load_model as keras_load_model
from tensorflow.keras.applications.inception_v3 import preprocess_input as inception_preprocess

# Force TensorFlow to use CPU only — avoids GPU scan overhead on CPU servers
tf.config.set_visible_devices([], "GPU")

# ======================================
# CONFIG
# ======================================
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Medical Implant Classifier API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://lakshayy10.github.io", "*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEVICE         = torch.device("cpu")   # CPU-only server
EFFICIENTNET_SIZE = 300   # EfficientNet-B3
HIP_IMAGE_SIZE    = 299   # InceptionV3 default


# ======================================
# CLASS LABELS
# ======================================
KNEE_CLASS_LABELS = [
    'Biomet AGC', 'Depuy Attune', 'Exatech Opterak Logic',
    'Smith and Nephew LEGION', 'Smith and Nephew ANTHEM',
    'Stryker SCORPIO', 'Zimmer LPS Flex Knee GSF', 'Zimmer NEXGEN',
    'Zimmer Natural Knee II', 'Zimmer Oxford', 'Zimmer Vanguard', 'Zimmer persona'
]

WRIST_CLASS_LABELS = [
    "Depuy Bias", "Depuy total modular wrist system", "Fischer Medical Universal 2",
    "Pyrodisk", "Swemac Motec", "Tornier-Bioprofile APSI", "Tornier-Bioprofile Amandys",
    "Tornier-Bioprofile Eclypse", "Wright Medical-Tornier STPI",
    "Zimmer Biomet Maestro", "RCPI"
]

SHOULDER_CLASS_LABELS = [
    "Accumed Polarus", "Arthex Inverse", "Arthex universe", "Biomet Bio-Angular",
    "Biomet Comprehensive", "Biomet verso", "DJO Encore Reverse",
    "DePuy Global Advantage CTA Head", "Depuy Delta", "Depuy Global",
    "EXATECH Equinox", "Evolutis UNIC", "Exatech Interspace", "Stryker O leary",
    "Stryker solar", "Tornier Aequalis Modular", "Tornier Press Fit", "Zimmer Bigliani",
    "Zimmer Biomet Sidus", "Zimmer Fenlin total shoulder system", "simth and nephew promos"
]

HIP_CLASS_LABELS = [
    "Adler Ortho Fixa Ti-Por", "Aesculap Methashort", "BBarun Bicontact", "Bioimpianti",
    "Biomet Gts stem", "Biomet Microplasty", "Corin Mini Hip", "Depuy Actis",
    "Depuy Charnley", "Depuy Synthes Corail", "Depuy S Rom", "Depuy Silent",
    "Depuy Summit", "Depuy Trilock", "Stryker Exeter", "JRI Orthopedics Furlong Orthopedics",
    "JRI Orthopedics ATS Avanteon", "Lima Corporate H-MAX", "LINK CFP",
    "MicroPort Orthopedics Profemur", "Smith and Nephew Birmingham",
    "Smith and Nephew Anthology", "Smith and Nephew Emperion",
    "Smith and Nephew Spectron", "Smith and Nephew Synergy Cementless Stem",
    "Stryker ABG II Modular", "Stryker Acolade II", "Stryker Omnifit",
    "Wright Conserve plus", "Zimmer Arcos", "Zimmer Biomet Alloclassic",
    "Zimmer Biomet Taperloc", "Zimmer Biomet versys", "Zimmer Continum Shell",
    "Zimmer Epoch", "Zimmer Fitmore", "Zimmer M/L Taper Hip Prosthesis",
    "Zimmer Revitan", "Zimmer TPP threaded", "Zimmer Wagner Cone"
]


# ======================================
# KNEE MANUFACTURER DATABASE
# ======================================
KNEE_MANUFACTURER_INFO = {
    "Biomet AGC": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/agc-total-knee-system.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/agc-total-knee-system/agc-total-knee-system-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/agc-total-knee-system/agc-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "The AGC Total Knee System is a proven, long-term performing implant from Zimmer Biomet with over 30 years of clinical heritage.",
    },
    "Depuy Attune": {
        "manufacturer":             "DePuy Synthes (Johnson & Johnson)",
        "product_page":             "https://www.jnjmedtech.com/en-US/product/attune-knee-system",
        "brochure_url":             "https://www.jnjmedtech.com/sites/default/files/product/files/ATTUNE-Knee-System-Patient-Brochure.pdf",
        "surgical_technique_url":   "https://www.jnjmedtech.com/sites/default/files/product/files/ATTUNE-Primary-Knee-System-Surgical-Technique.pdf",
        "logo_url":                 "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":              "https://www.jnjmedtech.com/en-US/contact",
        "about":                    "The ATTUNE Knee System is designed for improved kinematics, featuring graduated femoral curvature and a conforming tibial surface for enhanced stability.",
    },
    "Exatech Opterak Logic": {
        "manufacturer":             "Exactech",
        "product_page":             "https://www.exac.com/products/knee/optetrak-logic/",
        "brochure_url":             "https://www.exac.com/wp-content/uploads/Optetrak-Logic-Brochure.pdf",
        "surgical_technique_url":   "https://www.exac.com/wp-content/uploads/Optetrak-Logic-Surgical-Technique.pdf",
        "logo_url":                 "https://www.exac.com/wp-content/uploads/exactech-logo.png",
        "contact_url":              "https://www.exac.com/contact/",
        "about":                    "The Optetrak Logic Knee System from Exactech offers a streamlined instrument set and multiple bearing options for CR and PS configurations.",
    },
    "Smith and Nephew LEGION": {
        "manufacturer":             "Smith+Nephew",
        "product_page":             "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/knee-implants/legion-total-knee-system",
        "brochure_url":             "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/knee/legion/legion-total-knee-system-brochure.pdf",
        "surgical_technique_url":   "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/knee/legion/legion-surgical-technique.pdf",
        "logo_url":                 "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":              "https://www.smith-nephew.com/en-us/contact-us",
        "about":                    "The LEGION Total Knee System by Smith+Nephew offers comprehensive fixation options with OXINIUM oxidized zirconium for improved wear characteristics.",
    },
    "Smith and Nephew ANTHEM": {
        "manufacturer":             "Smith+Nephew",
        "product_page":             "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/knee-implants/anthem-total-knee-system",
        "brochure_url":             "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/knee/anthem/anthem-total-knee-system-brochure.pdf",
        "surgical_technique_url":   "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/knee/anthem/anthem-surgical-technique.pdf",
        "logo_url":                 "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":              "https://www.smith-nephew.com/en-us/contact-us",
        "about":                    "The ANTHEM Total Knee System features an advanced bearing surface and patient-specific sizing options designed for natural knee kinematics.",
    },
    "Stryker SCORPIO": {
        "manufacturer":             "Stryker",
        "product_page":             "https://www.stryker.com/us/en/joint-replacement/products/scorpio-nrg-cruciate-retaining-knee-system.html",
        "brochure_url":             "https://www.stryker.com/content/dam/stryker/joint-replacement/products/scorpio/scorpio-nrg-brochure.pdf",
        "surgical_technique_url":   "https://www.stryker.com/content/dam/stryker/joint-replacement/products/scorpio/scorpio-surgical-technique.pdf",
        "logo_url":                 "https://www.stryker.com/content/dam/stryker/logos/stryker-logo.png",
        "contact_url":              "https://www.stryker.com/us/en/contact-us.html",
        "about":                    "The Stryker SCORPIO NRG Knee System features a single-radius femoral design for consistent collateral ligament tension throughout the arc of motion.",
    },
    "Zimmer LPS Flex Knee GSF": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/lps-flex-knee.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/lps-flex/lps-flex-knee-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/lps-flex/lps-flex-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "The LPS-Flex Knee System is designed for high-flexion activities, providing up to 155° of flexion. The Gender Solutions Feature (GSF) offers anatomy-specific sizing.",
    },
    "Zimmer NEXGEN": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/nexgen-complete-knee-solution.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/nexgen/nexgen-complete-knee-solution-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/nexgen/nexgen-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "NexGen Complete Knee Solution is one of the most widely implanted knee systems globally with over 20 years of clinical data and millions of implants.",
    },
    "Zimmer Natural Knee II": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/natural-knee-ii-system.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/natural-knee-ii/natural-knee-ii-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/natural-knee-ii/natural-knee-ii-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "The Natural Knee II System features an anatomically-shaped tibial baseplate and multiple polyethylene options for both CR and PS configurations.",
    },
    "Zimmer Oxford": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/oxford-partial-knee.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/oxford/oxford-partial-knee-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/oxford/oxford-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "The Oxford Partial Knee is the world's most implanted unicompartmental knee system with over 1 million implants and strong long-term survivorship data.",
    },
    "Zimmer Vanguard": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/vanguard-complete-knee-system.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/vanguard/vanguard-complete-knee-system-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/vanguard/vanguard-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "The Vanguard Complete Knee System features an anatomic femoral design and a comprehensive range of primary and revision components.",
    },
    "Zimmer persona": {
        "manufacturer":             "Zimmer Biomet",
        "product_page":             "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/knee/persona-knee-system.html",
        "brochure_url":             "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/persona/persona-knee-system-brochure.pdf",
        "surgical_technique_url":   "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/knee/persona/persona-surgical-technique.pdf",
        "logo_url":                 "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":              "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                    "The Persona Knee System features the most size options of any knee system with gender-specific sizing and multiple bearing options including the Persona OsseoTi cementless.",
    },
}


# ======================================
# HIP MANUFACTURER DATABASE
# ======================================
HIP_MANUFACTURER_INFO = {
    "Adler Ortho Fixa Ti-Por": {
        "manufacturer":           "Adler Ortho",
        "product_page":           "https://www.adlerortho.com/en/products/hip/fixa-ti-por",
        "brochure_url":           "https://www.adlerortho.com/media/fixa-ti-por-brochure.pdf",
        "surgical_technique_url": "https://www.adlerortho.com/media/fixa-ti-por-surgical-technique.pdf",
        "logo_url":               "https://www.adlerortho.com/themes/adler/logo.png",
        "contact_url":            "https://www.adlerortho.com/en/contacts",
        "about":                  "The Fixa Ti-Por stem features a titanium porous coating for biological fixation, designed for primary cementless hip arthroplasty.",
    },
    "Aesculap Methashort": {
        "manufacturer":           "Aesculap (B. Braun)",
        "product_page":           "https://www.aesculap.com/products/orthopedics/hip/methashort",
        "brochure_url":           "https://www.aesculap.com/media/methashort-brochure.pdf",
        "surgical_technique_url": "https://www.aesculap.com/media/methashort-surgical-technique.pdf",
        "logo_url":               "https://www.aesculap.com/media/aesculap-logo.png",
        "contact_url":            "https://www.aesculap.com/contact",
        "about":                  "The Methashort stem is a short, metaphyseal-anchored hip stem from Aesculap designed for bone preservation in primary THR.",
    },
    "BBarun Bicontact": {
        "manufacturer":           "B. Braun / Aesculap",
        "product_page":           "https://www.aesculap.com/products/orthopedics/hip/bicontact",
        "brochure_url":           "https://www.aesculap.com/media/bicontact-brochure.pdf",
        "surgical_technique_url": "https://www.aesculap.com/media/bicontact-surgical-technique.pdf",
        "logo_url":               "https://www.aesculap.com/media/aesculap-logo.png",
        "contact_url":            "https://www.aesculap.com/contact",
        "about":                  "The Bicontact hip system has a long clinical track record with proven cementless fixation and modular neck options.",
    },
    "Bioimpianti": {
        "manufacturer":           "Bioimpianti",
        "product_page":           "https://www.bioimpianti.com/en/products/hip",
        "brochure_url":           "https://www.bioimpianti.com/media/hip-brochure.pdf",
        "surgical_technique_url": "https://www.bioimpianti.com/media/hip-surgical-technique.pdf",
        "logo_url":               "https://www.bioimpianti.com/media/logo.png",
        "contact_url":            "https://www.bioimpianti.com/en/contacts",
        "about":                  "Bioimpianti specialises in orthopaedic implants with a focus on hip reconstruction systems for primary and revision surgery.",
    },
    "Biomet Gts stem": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/gts-hip-stem.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/gts/gts-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/gts/gts-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The GTS Hip Stem from Zimmer Biomet features a titanium alloy body with a trapezoidal cross-section for rotational stability in cementless fixation.",
    },
    "Biomet Microplasty": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/microplasty-stem.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/microplasty/microplasty-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/microplasty/microplasty-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Microplasty stem is a cemented collarless tapered hip stem designed for primary total hip arthroplasty with a proven clinical record.",
    },
    "Corin Mini Hip": {
        "manufacturer":           "Corin Group",
        "product_page":           "https://www.coringroup.com/products/hip/mini-hip/",
        "brochure_url":           "https://www.coringroup.com/media/mini-hip-brochure.pdf",
        "surgical_technique_url": "https://www.coringroup.com/media/mini-hip-surgical-technique.pdf",
        "logo_url":               "https://www.coringroup.com/media/corin-logo.png",
        "contact_url":            "https://www.coringroup.com/contact/",
        "about":                  "The Mini Hip system from Corin is a short bone-conserving cementless stem designed to preserve proximal femoral bone stock.",
    },
    "Depuy Actis": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/actis-total-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/ACTIS-Hip-System-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/ACTIS-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The ACTIS Total Hip System features a tapered wedge design for primary cementless fixation with excellent initial stability and long-term osseointegration.",
    },
    "Depuy Charnley": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/charnley-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/Charnley-Hip-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/Charnley-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The Charnley Hip System is one of the most clinically studied cemented hip implants in the world with decades of published outcomes data.",
    },
    "Depuy Synthes Corail": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/corail-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/CORAIL-Hip-System-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/CORAIL-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The CORAIL Hip System has over 30 years of clinical data and is one of the most implanted cementless hip stems globally, with a unique fully HA-coated titanium design.",
    },
    "Depuy S Rom": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/s-rom-modular-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/S-ROM-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/S-ROM-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The S-ROM Modular Hip System provides independent sizing of the proximal sleeve and distal stem, ideal for complex primary and revision hip surgery.",
    },
    "Depuy Silent": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/silent-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/Silent-Hip-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/Silent-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The Silent Hip is a short stem implant designed for bone-conserving hip replacement, providing excellent proximal load transfer.",
    },
    "Depuy Summit": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/summit-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/Summit-Hip-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/Summit-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The Summit Hip System is a tapered titanium alloy stem with a plasma-sprayed HA coating for reliable biological fixation.",
    },
    "Depuy Trilock": {
        "manufacturer":           "DePuy Synthes (Johnson & Johnson)",
        "product_page":           "https://www.jnjmedtech.com/en-US/product/trilock-hip-system",
        "brochure_url":           "https://www.jnjmedtech.com/sites/default/files/product/files/TRILOCK-Hip-Brochure.pdf",
        "surgical_technique_url": "https://www.jnjmedtech.com/sites/default/files/product/files/TRILOCK-Surgical-Technique.pdf",
        "logo_url":               "https://www.jnjmedtech.com/themes/custom/jnj/logo.svg",
        "contact_url":            "https://www.jnjmedtech.com/en-US/contact",
        "about":                  "The TRILOCK Bone Preservation Stem features a unique triple taper design for minimal bone removal and excellent fixation in cementless THR.",
    },
    "Stryker Exeter": {
        "manufacturer":           "Stryker",
        "product_page":           "https://www.stryker.com/us/en/joint-replacement/products/exeter-hip-system.html",
        "brochure_url":           "https://www.stryker.com/content/dam/stryker/joint-replacement/products/exeter/exeter-brochure.pdf",
        "surgical_technique_url": "https://www.stryker.com/content/dam/stryker/joint-replacement/products/exeter/exeter-surgical-technique.pdf",
        "logo_url":               "https://www.stryker.com/content/dam/stryker/logos/stryker-logo.png",
        "contact_url":            "https://www.stryker.com/us/en/contact-us.html",
        "about":                  "The Exeter Hip System is a polished cemented hip stem with over 30 years of published data and one of the highest survivorship rates in cemented hip arthroplasty.",
    },
    "JRI Orthopedics Furlong Orthopedics": {
        "manufacturer":           "JRI Orthopaedics",
        "product_page":           "https://www.jriorthopaedics.com/products/hip/furlong/",
        "brochure_url":           "https://www.jriorthopaedics.com/media/furlong-brochure.pdf",
        "surgical_technique_url": "https://www.jriorthopaedics.com/media/furlong-surgical-technique.pdf",
        "logo_url":               "https://www.jriorthopaedics.com/media/jri-logo.png",
        "contact_url":            "https://www.jriorthopaedics.com/contact/",
        "about":                  "The Furlong stem is a fully HA-coated cementless hip stem with over 30 years of clinical use and excellent long-term survival data.",
    },
    "JRI Orthopedics ATS Avanteon": {
        "manufacturer":           "JRI Orthopaedics",
        "product_page":           "https://www.jriorthopaedics.com/products/hip/avanteon/",
        "brochure_url":           "https://www.jriorthopaedics.com/media/avanteon-brochure.pdf",
        "surgical_technique_url": "https://www.jriorthopaedics.com/media/avanteon-surgical-technique.pdf",
        "logo_url":               "https://www.jriorthopaedics.com/media/jri-logo.png",
        "contact_url":            "https://www.jriorthopaedics.com/contact/",
        "about":                  "The ATS Avanteon hip system features an advanced tapered stem with HA coating for reliable primary cementless fixation.",
    },
    "Lima Corporate H-MAX": {
        "manufacturer":           "Lima Corporate",
        "product_page":           "https://www.limacorporate.com/medical/en/products/hip/h-max.html",
        "brochure_url":           "https://www.limacorporate.com/media/h-max-brochure.pdf",
        "surgical_technique_url": "https://www.limacorporate.com/media/h-max-surgical-technique.pdf",
        "logo_url":               "https://www.limacorporate.com/media/lima-logo.png",
        "contact_url":            "https://www.limacorporate.com/medical/en/contact.html",
        "about":                  "The H-MAX hip stem from Lima Corporate is a cementless femoral stem with trabecular titanium coating for optimal bone ingrowth.",
    },
    "LINK CFP": {
        "manufacturer":           "Waldemar LINK",
        "product_page":           "https://www.linkswaldemar.com/en/products/hip/cfp-stem/",
        "brochure_url":           "https://www.linkswaldemar.com/media/cfp-brochure.pdf",
        "surgical_technique_url": "https://www.linkswaldemar.com/media/cfp-surgical-technique.pdf",
        "logo_url":               "https://www.linkswaldemar.com/media/link-logo.png",
        "contact_url":            "https://www.linkswaldemar.com/en/contact/",
        "about":                  "The CFP (Collum Femoris Preserving) stem by LINK is a short, calcar-preserving cementless stem for minimally invasive primary hip arthroplasty.",
    },
    "MicroPort Orthopedics Profemur": {
        "manufacturer":           "MicroPort Orthopedics",
        "product_page":           "https://www.microportortho.com/products/hip/profemur/",
        "brochure_url":           "https://www.microportortho.com/media/profemur-brochure.pdf",
        "surgical_technique_url": "https://www.microportortho.com/media/profemur-surgical-technique.pdf",
        "logo_url":               "https://www.microportortho.com/media/microport-logo.png",
        "contact_url":            "https://www.microportortho.com/contact/",
        "about":                  "The Profemur hip system features a modular neck for intraoperative adjustment of offset, length, and anteversion to achieve optimal hip biomechanics.",
    },
    "Smith and Nephew Birmingham": {
        "manufacturer":           "Smith+Nephew",
        "product_page":           "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/hip-implants/birmingham-hip-resurfacing",
        "brochure_url":           "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/bhr/bhr-brochure.pdf",
        "surgical_technique_url": "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/bhr/bhr-surgical-technique.pdf",
        "logo_url":               "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":            "https://www.smith-nephew.com/en-us/contact-us",
        "about":                  "The Birmingham Hip Resurfacing (BHR) system preserves femoral bone stock with a metal-on-metal resurfacing design, ideal for young active patients.",
    },
    "Smith and Nephew Anthology": {
        "manufacturer":           "Smith+Nephew",
        "product_page":           "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/hip-implants/anthology-hip-system",
        "brochure_url":           "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/anthology/anthology-brochure.pdf",
        "surgical_technique_url": "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/anthology/anthology-surgical-technique.pdf",
        "logo_url":               "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":            "https://www.smith-nephew.com/en-us/contact-us",
        "about":                  "The Anthology Hip System features a comprehensive acetabular and femoral solution with multiple stem options for primary and complex hip replacement.",
    },
    "Smith and Nephew Emperion": {
        "manufacturer":           "Smith+Nephew",
        "product_page":           "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/hip-implants/emperion-hip-stem",
        "brochure_url":           "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/emperion/emperion-brochure.pdf",
        "surgical_technique_url": "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/emperion/emperion-surgical-technique.pdf",
        "logo_url":               "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":            "https://www.smith-nephew.com/en-us/contact-us",
        "about":                  "The Emperion Modular Hip System provides versatility with interchangeable proximal bodies and distal stems for optimal fit in primary and revision cases.",
    },
    "Smith and Nephew Spectron": {
        "manufacturer":           "Smith+Nephew",
        "product_page":           "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/hip-implants/spectron-hip-system",
        "brochure_url":           "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/spectron/spectron-brochure.pdf",
        "surgical_technique_url": "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/spectron/spectron-surgical-technique.pdf",
        "logo_url":               "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":            "https://www.smith-nephew.com/en-us/contact-us",
        "about":                  "The Spectron EF hip stem is a polished double-tapered cemented stem with excellent long-term clinical outcomes and high survivorship rates.",
    },
    "Smith and Nephew Synergy Cementless Stem": {
        "manufacturer":           "Smith+Nephew",
        "product_page":           "https://www.smith-nephew.com/en-us/health-care-professionals/products/orthopaedics/hip-implants/synergy-hip-system",
        "brochure_url":           "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/synergy/synergy-brochure.pdf",
        "surgical_technique_url": "https://www.smith-nephew.com/globalassets/pdf/products/orthopaedics/hip/synergy/synergy-surgical-technique.pdf",
        "logo_url":               "https://www.smith-nephew.com/globalassets/global-assets/logos/smith-nephew-logo.svg",
        "contact_url":            "https://www.smith-nephew.com/en-us/contact-us",
        "about":                  "The Synergy Cementless Hip Stem features a titanium plasma spray proximal coating and smooth distal finish for stress-shielding reduction.",
    },
    "Stryker ABG II Modular": {
        "manufacturer":           "Stryker",
        "product_page":           "https://www.stryker.com/us/en/joint-replacement/products/abg-ii-modular-hip.html",
        "brochure_url":           "https://www.stryker.com/content/dam/stryker/joint-replacement/products/abg2/abg2-brochure.pdf",
        "surgical_technique_url": "https://www.stryker.com/content/dam/stryker/joint-replacement/products/abg2/abg2-surgical-technique.pdf",
        "logo_url":               "https://www.stryker.com/content/dam/stryker/logos/stryker-logo.png",
        "contact_url":            "https://www.stryker.com/us/en/contact-us.html",
        "about":                  "The ABG II Modular hip system provides comprehensive modularity allowing surgeons to address complex anatomy and deformity in primary and revision hip arthroplasty.",
    },
    "Stryker Acolade II": {
        "manufacturer":           "Stryker",
        "product_page":           "https://www.stryker.com/us/en/joint-replacement/products/acolade-ii-hip-stem.html",
        "brochure_url":           "https://www.stryker.com/content/dam/stryker/joint-replacement/products/acolade2/acolade2-brochure.pdf",
        "surgical_technique_url": "https://www.stryker.com/content/dam/stryker/joint-replacement/products/acolade2/acolade2-surgical-technique.pdf",
        "logo_url":               "https://www.stryker.com/content/dam/stryker/logos/stryker-logo.png",
        "contact_url":            "https://www.stryker.com/us/en/contact-us.html",
        "about":                  "The Acolade II Hip Stem is a tapered wedge cementless stem with a Rejuvenate titanium fiber metal proximal coating for excellent bone ingrowth.",
    },
    "Stryker Omnifit": {
        "manufacturer":           "Stryker",
        "product_page":           "https://www.stryker.com/us/en/joint-replacement/products/omnifit-hip-stem.html",
        "brochure_url":           "https://www.stryker.com/content/dam/stryker/joint-replacement/products/omnifit/omnifit-brochure.pdf",
        "surgical_technique_url": "https://www.stryker.com/content/dam/stryker/joint-replacement/products/omnifit/omnifit-surgical-technique.pdf",
        "logo_url":               "https://www.stryker.com/content/dam/stryker/logos/stryker-logo.png",
        "contact_url":            "https://www.stryker.com/us/en/contact-us.html",
        "about":                  "The Omnifit Hip Stem is a cementless, anatomic stem designed for optimal fit and fill of the femoral canal with proximal porous coating.",
    },
    "Wright Conserve plus": {
        "manufacturer":           "Wright Medical (Stryker)",
        "product_page":           "https://www.stryker.com/us/en/joint-replacement/products/conserve-plus-hip.html",
        "brochure_url":           "https://www.stryker.com/content/dam/stryker/joint-replacement/products/conserve/conserve-plus-brochure.pdf",
        "surgical_technique_url": "https://www.stryker.com/content/dam/stryker/joint-replacement/products/conserve/conserve-plus-surgical-technique.pdf",
        "logo_url":               "https://www.stryker.com/content/dam/stryker/logos/stryker-logo.png",
        "contact_url":            "https://www.stryker.com/us/en/contact-us.html",
        "about":                  "The Conserve Plus is a metal-on-metal hip resurfacing system offering bone preservation and high activity tolerance for younger patients.",
    },
    "Zimmer Arcos": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/arcos-modular-hip-system.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/arcos/arcos-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/arcos/arcos-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Arcos Modular Hip System provides intraoperative flexibility with interchangeable proximal and distal components for complex revision hip surgery.",
    },
    "Zimmer Biomet Alloclassic": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/alloclassic-hip-system.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/alloclassic/alloclassic-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/alloclassic/alloclassic-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Alloclassic Hip System is a straight-tapered cementless stem with excellent long-term data, featuring a Ti-plasma spray coating for bone ingrowth.",
    },
    "Zimmer Biomet Taperloc": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/taperloc-hip-stem.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/taperloc/taperloc-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/taperloc/taperloc-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Taperloc Hip Stem has over 35 years of clinical data and features a titanium tapered design for reliable press-fit fixation with minimal stress shielding.",
    },
    "Zimmer Biomet versys": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/versys-hip-system.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/versys/versys-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/versys/versys-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Versys Hip System offers both cemented and cementless options with a proven design for optimal fit and fill across a wide range of femoral geometries.",
    },
    "Zimmer Continum Shell": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/continuum-acetabular-system.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/continuum/continuum-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/continuum/continuum-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Continuum Acetabular System features a porous titanium shell with a titanium fiber metal surface for reliable cementless fixation in primary and revision cases.",
    },
    "Zimmer Epoch": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/epoch-hip-stem.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/epoch/epoch-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/epoch/epoch-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Epoch Hip Stem uses a composite material construction to reduce stress shielding, combining a carbon fibre composite core with a titanium proximal body.",
    },
    "Zimmer Fitmore": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/fitmore-hip-stem.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/fitmore/fitmore-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/fitmore/fitmore-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Fitmore Hip Stem is a short, curved cementless stem designed for bone preservation and minimally invasive hip arthroplasty with lateral flare for rotational stability.",
    },
    "Zimmer M/L Taper Hip Prosthesis": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/ml-taper-hip-prosthesis.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/ml-taper/ml-taper-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/ml-taper/ml-taper-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The M/L Taper Hip Prosthesis features a tapered rectangular cross-section for initial stability and has over 25 years of clinical use.",
    },
    "Zimmer Revitan": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/revitan-curved-hip-system.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/revitan/revitan-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/revitan/revitan-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Revitan Curved Hip System is designed for complex revision surgery, featuring a curved modular stem that bypasses femoral defects for distal fixation.",
    },
    "Zimmer TPP threaded": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/tpp-hip-system.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/tpp/tpp-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/tpp/tpp-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The TPP Threaded Cup is a cementless acetabular component with a threaded design for primary mechanical fixation and titanium porous coating for long-term ingrowth.",
    },
    "Zimmer Wagner Cone": {
        "manufacturer":           "Zimmer Biomet",
        "product_page":           "https://www.zimmerbiomet.com/en/products-and-solutions/specialties/hip/wagner-cone-hip-prosthesis.html",
        "brochure_url":           "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/wagner-cone/wagner-cone-brochure.pdf",
        "surgical_technique_url": "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/medical-professionals/hip/wagner-cone/wagner-cone-surgical-technique.pdf",
        "logo_url":               "https://www.zimmerbiomet.com/content/dam/zimmer-biomet/logos/zimmer-biomet-logo.png",
        "contact_url":            "https://www.zimmerbiomet.com/en/contact-us.html",
        "about":                  "The Wagner Cone Hip Prosthesis is a revision stem with a conical fluted design for diaphyseal fixation in cases of severe proximal femoral bone loss.",
    },
}


# ======================================
# MODELS (global singletons)
# ======================================
knee_model    = None
shoulder_model = None
hip_model     = None   # Keras InceptionV3 .h5


# ======================================
# ARCHITECTURES
# ======================================
def get_efficientnet_b3(num_classes: int):
    weights = EfficientNet_B3_Weights.DEFAULT
    model   = efficientnet_b3(weights=weights)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    return model


# ======================================
# PREPROCESSING
# ======================================
def preprocess_efficientnet(image: Image.Image):
    """EfficientNet-B3 preprocessing (300×300, ImageNet normalisation)."""
    pipe = transforms.Compose([
        transforms.Resize((EFFICIENTNET_SIZE, EFFICIENTNET_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])
    return pipe(image).unsqueeze(0).to(DEVICE)


def preprocess_hip(image: Image.Image) -> np.ndarray:
    """InceptionV3 preprocessing (299×299, [-1, 1] scale)."""
    img   = image.resize((HIP_IMAGE_SIZE, HIP_IMAGE_SIZE))
    arr   = np.array(img, dtype=np.float32)
    arr   = inception_preprocess(arr)          # scales to [-1, 1]
    return np.expand_dims(arr, axis=0)         # (1, 299, 299, 3)


# ======================================
# LOAD FUNCTIONS
# ======================================
def load_knee_model():
    global knee_model
    if knee_model is None:
        try:
            knee_model = get_efficientnet_b3(num_classes=len(KNEE_CLASS_LABELS))
            knee_model.load_state_dict(torch.load("knee.pth", map_location=DEVICE))
            knee_model.to(DEVICE)
            knee_model.eval()
            logger.info("✅ Knee model loaded")
        except Exception as e:
            logger.error(f"❌ Failed to load knee model: {e}")


def load_shoulder_model():
    global shoulder_model
    if shoulder_model is None:
        try:
            shoulder_model = get_efficientnet_b3(num_classes=len(SHOULDER_CLASS_LABELS))
            shoulder_model.load_state_dict(torch.load("./efficientnet_b3_best_model.pth", map_location=DEVICE))
            shoulder_model.to(DEVICE)
            shoulder_model.eval()
            logger.info("✅ Shoulder model loaded")
        except Exception as e:
            logger.error(f"❌ Failed to load shoulder model: {e}")


def load_hip_model():
    global hip_model
    if hip_model is None:
        try:
            hip_model = keras_load_model("hip40,83inceptv3.h5")
            logger.info("✅ Hip model loaded")
        except Exception as e:
            logger.error(f"❌ Failed to load hip model: {e}")


# ======================================
# RESPONSE BUILDERS
# ======================================
def build_enriched_response(
    label: str,
    confidence: float,
    all_probs: list,
    class_labels: list,
    manufacturer_db: dict,
) -> dict:
    """Generic enriched response builder for any implant type."""
    indexed = sorted(enumerate(all_probs), key=lambda x: x[1], reverse=True)
    top3 = [
        {
            "implant":    class_labels[i],
            "confidence": round(p, 4),
            "percentage": f"{round(p * 100, 1)}%",
        }
        for i, p in indexed[:3]
    ]

    mfr_info = manufacturer_db.get(label, {
        "manufacturer":           "Unknown Manufacturer",
        "product_page":           None,
        "brochure_url":           None,
        "surgical_technique_url": None,
        "logo_url":               None,
        "contact_url":            None,
        "about":                  "No additional information available for this implant.",
    })

    return {
        "prediction":     label,
        "confidence":     round(confidence, 4),
        "confidence_pct": f"{round(confidence * 100, 1)}%",
        "top3":           top3,
        "manufacturer": {
            "name":                   mfr_info.get("manufacturer", "Unknown"),
            "about_implant":          mfr_info.get("about", ""),
            "product_page":           mfr_info.get("product_page"),
            "brochure_url":           mfr_info.get("brochure_url"),
            "surgical_technique_url": mfr_info.get("surgical_technique_url"),
            "logo_url":               mfr_info.get("logo_url"),
            "contact_url":            mfr_info.get("contact_url"),
        },
        "predicted_at": datetime.now().isoformat(),
    }


# ======================================
# ENDPOINTS
# ======================================
@app.get("/")
def read_root():
    return {"message": "Medical Implant Classifier API", "version": "2.0.0"}


@app.get("/health")
async def health_check():
    return {
        "status":    "healthy",
        "timestamp": datetime.now().isoformat(),
        "models_loaded": {
            "knee":     knee_model is not None,
            "shoulder": shoulder_model is not None,
            "hip":      hip_model is not None,
        }
    }


@app.get("/knee/implants")
async def list_knee_implants():
    return {
        "implants": [
            {"label": label, **KNEE_MANUFACTURER_INFO.get(label, {})}
            for label in KNEE_CLASS_LABELS
        ]
    }


@app.get("/hip/implants")
async def list_hip_implants():
    return {
        "implants": [
            {"label": label, **HIP_MANUFACTURER_INFO.get(label, {})}
            for label in HIP_CLASS_LABELS
        ]
    }


@app.post("/predict/knee")
async def predict_knee(file: UploadFile = File(...)):
    load_knee_model()
    if knee_model is None:
        raise HTTPException(status_code=503, detail="Knee model not available")
    try:
        image_bytes  = await file.read()
        image        = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = preprocess_efficientnet(image)

        with torch.no_grad():
            output     = knee_model(input_tensor)
            probs      = torch.nn.functional.softmax(output, dim=1)
            all_probs  = probs[0].tolist()
            pred_index = torch.argmax(probs, dim=1).item()
            confidence = torch.max(probs).item()

        label = KNEE_CLASS_LABELS[pred_index]
        return build_enriched_response(label, confidence, all_probs,
                                       KNEE_CLASS_LABELS, KNEE_MANUFACTURER_INFO)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Knee prediction failed: {e}")


@app.post("/predict/shoulder")
async def predict_shoulder(file: UploadFile = File(...)):
    load_shoulder_model()
    if shoulder_model is None:
        raise HTTPException(status_code=503, detail="Shoulder model not available")
    try:
        image_bytes  = await file.read()
        image        = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_tensor = preprocess_efficientnet(image)

        with torch.no_grad():
            output     = shoulder_model(input_tensor)
            probs      = torch.nn.functional.softmax(output, dim=1)
            pred_index = torch.argmax(probs, dim=1).item()
            confidence = torch.max(probs).item()

        return {
            "prediction":     SHOULDER_CLASS_LABELS[pred_index],
            "confidence":     round(confidence, 4),
            "confidence_pct": f"{round(confidence * 100, 1)}%",
            "predicted_at":   datetime.now().isoformat(),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Shoulder prediction failed: {e}")


@app.post("/predict/hip")
async def predict_hip(file: UploadFile = File(...)):
    load_hip_model()
    if hip_model is None:
        raise HTTPException(status_code=503, detail="Hip model not available")
    try:
        image_bytes = await file.read()
        image       = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        input_arr   = preprocess_hip(image)

        preds      = hip_model.predict(input_arr, verbose=0)   # shape (1, 40)
        all_probs  = preds[0].tolist()
        pred_index = int(np.argmax(all_probs))
        confidence = float(np.max(all_probs))

        label = HIP_CLASS_LABELS[pred_index]
        return build_enriched_response(label, confidence, all_probs,
                                       HIP_CLASS_LABELS, HIP_MANUFACTURER_INFO)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hip prediction failed: {e}")
