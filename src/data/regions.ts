/* ===========================================================================
   Anatomical region catalogue.
   Single source of truth for the X-ray library index, every region library
   page and every identification model page.
   =========================================================================== */

export type Implant = { name: string; image?: string };

export type Region = {
  slug: string;
  name: string;
  /** Route for the reference library. */
  path: string;
  /** Route for the AI identification tool, when a model is deployed. */
  modelPath?: string;
  /** Prediction endpoint for modelPath. */
  endpoint?: string;
  description: string;
  /** Representative radiograph for the library index. */
  cover: string;
  implants: Implant[];
  /** Regions we catalogue but have not published yet. */
  available: boolean;
};

const WP = 'https://priyanshsonthalia23-nmbuw.wordpress.com/wp-content/uploads/2025/09';
const BB = 'https://balbharatiin.wordpress.com/wp-content/uploads/2025/09';

export const regions: Region[] = [
  {
    slug: 'knee',
    name: 'Knee',
    path: '/xray/knee',
    modelPath: '/knee-model',
    endpoint: 'https://impant.onrender.com/predict/knee',
    description: 'Total knee replacements, unicondylar and patellofemoral implants.',
    cover: `${BB}/vanguard-1.png`,
    available: true,
    implants: [
      { name: 'Smith and Nephew LEGION', image: `${BB}/legion.png` },
      { name: 'Smith and Nephew ANTHEM', image: `${BB}/nephewanthem.jpeg` },
      { name: 'Stryker SCORPIO', image: `${BB}/scorpio.png` },
      { name: 'Zimmer LPS Flex Knee GSF', image: `${BB}/lps.jpeg` },
      { name: 'Zimmer Natural Knee II', image: `${BB}/natural.jpeg` },
      { name: 'Zimmer NEXGEN', image: `${BB}/nexgen.jpeg` },
      { name: 'Zimmer Oxford', image: `${BB}/oxford.png` },
      { name: 'Zimmer Persona', image: `${BB}/persona.png` },
      { name: 'Zimmer Vanguard', image: `${BB}/vanguard-1.png` },
      { name: 'Biomet AGC', image: `${BB}/biomet.jpeg` },
      { name: 'Depuy Attune', image: `${BB}/whatsapp-image-2025-09-13-at-2.57.27-pm.jpeg` },
      { name: 'Exatech Optetrak Logic', image: `${BB}/whatsapp-image-2025-09-13-at-2.46.02-pm.jpeg` },
    ],
  },
  {
    slug: 'hip',
    name: 'Hip',
    path: '/xray/hip',
    modelPath: '/hip-model',
    endpoint: 'https://impant.onrender.com/predict/hip',
    description: 'Total hip replacements, hip resurfacing and acetabular components.',
    cover: `${BB}/whatsapp-image-2025-09-13-at-12.48.33-am.jpeg`,
    available: true,
    implants: [
      { name: 'Stryker Exeter', image: `${WP}/stryker-exeter.png` },
      { name: 'Stryker Accolade II', image: `${WP}/ap-image-1.jpeg` },
      { name: 'Smith and Nephew Polar Cup', image: `${WP}/ap-image-2r.jpeg` },
      { name: 'Depuy Trilock', image: `${WP}/depuy-trilock.jpg` },
      { name: 'Depuy SROM', image: `${WP}/depuy-srom.png` },
      { name: 'Depuy Corail', image: `${WP}/depuy-corail-667.jpg` },
      { name: 'Depuy Charnley', image: `${WP}/depuy-charnley.png` },
      { name: 'Biomet Arcos', image: `${WP}/biomet-arcos-12.2-1.jpeg` },
      { name: 'Biomet Taperloc', image: `${WP}/taperloc-2.1l.jpeg` },
      { name: 'Biomet Echo Bimetric', image: `${WP}/biomet-echo-bimetric.jpeg` },
      { name: 'Aesculap Bicontact', image: `${WP}/aesculp-bicontact.png` },
    ],
  },
  {
    slug: 'shoulder',
    name: 'Shoulder',
    path: '/xray/shoulder',
    modelPath: '/shoulder-model',
    endpoint: 'https://impant.onrender.com/predict/shoulder',
    description: 'Total shoulder, reverse shoulder and hemiarthroplasty implants.',
    cover: `${BB}/3m-ap-2.png`,
    available: true,
    implants: [
      { name: 'Accumed Polarus', image: `${WP}/polarus-4.png` },
      { name: 'Arthrex Inverse', image: `${WP}/arthex-inverse-6.png` },
      { name: 'Arthrex Universe', image: `${WP}/universe-4.png` },
      { name: 'Biomet Bio-Angular', image: `${WP}/biometbipolar.jpg` },
      { name: 'Biomet Comprehensive', image: `${WP}/comprehensive-7.png` },
      { name: 'Biomet Verso', image: `${WP}/verso-biomet-1.png` },
      { name: 'DJO Encore Reverse', image: `${WP}/encorereversexray3.jpg` },
      { name: 'DePuy Global Advantage CTA Head', image: `${WP}/depuyglobabladva.jpg` },
      { name: 'Depuy Delta', image: `${WP}/depuydelya.png` },
      { name: 'Depuy Global', image: `${WP}/depuyglobal.png` },
      { name: 'Exatech Equinox', image: `${WP}/exactechequinoxexray5.png` },
      { name: 'Evolutis UNIC', image: `${WP}/evolutis-unic.png` },
      { name: 'Exatech Interspace', image: `${WP}/interspace-8.png` },
      { name: "Stryker O'Leary", image: `${WP}/o-leary-5.png` },
      { name: 'Stryker Solar', image: `${WP}/strykersolar.jpg` },
      { name: 'Tornier Aequalis Modular', image: `${WP}/tornieraequalisxray5.jpg` },
      { name: 'Tornier Press Fit', image: `${WP}/pressfit.jpg` },
      { name: 'Zimmer Bigliani', image: `${WP}/zimmerbiglianixray250.jpg` },
      { name: 'Zimmer Biomet Sidus', image: `${WP}/biomet.png` },
      { name: 'Zimmer Fenlin Total Shoulder System', image: `${WP}/fenlinxray.jpg` },
      { name: 'Smith and Nephew Promos', image: `${WP}/promos-4.png` },
    ],
  },
  {
    slug: 'wrist',
    name: 'Wrist',
    path: '/xray/wrist',
    modelPath: '/wrist-model',
    endpoint: 'https://impant.onrender.com/predict/wrist',
    description: 'Wrist replacement systems and arthroplasty implants.',
    cover: `${BB}/whatsapp-image-2025-07-12-at-8.29.51-am.jpeg`,
    available: true,
    implants: [
      { name: 'Depuy Bias' },
      { name: 'Depuy Total Modular Wrist System' },
      { name: 'Fischer Medical Universal 2' },
      { name: 'Pyrodisk' },
      { name: 'RCPI' },
      { name: 'Swemac Motec' },
      { name: 'Tornier-Bioprofile Amandys' },
      { name: 'Tornier-Bioprofile APSI' },
      { name: 'Tornier-Bioprofile Eclypse' },
      { name: 'Wright Medical-Tornier STPI' },
      { name: 'Zimmer Biomet Maestro' },
    ],
  },
  {
    slug: 'spine',
    name: 'Spine',
    path: '/xray/spine',
    description: 'Cervical, thoracic and lumbar fixation systems.',
    cover: `${BB}/whatsapp-image-2025-09-14-at-11.42.53-pm.jpeg`,
    available: true,
    implants: [
      { name: 'Medtronic Pedicle Screw + Rod', image: `${WP}/medtronics.jpeg` },
      { name: 'Prospine Pedicle Screw Fixation', image: `${WP}/prospine.jpeg` },
      { name: 'Gesco ACDF', image: `${WP}/acdf.jpeg` },
      { name: 'Gesco TLIF Cage', image: `${WP}/tilfcage.jpeg` },
    ],
  },
  {
    slug: 'thumb',
    name: 'Thumb',
    path: '/xray/thumb',
    description: 'Thumb joint replacements and CMC arthroplasty implants.',
    cover: `${BB}/whatsapp-image-2025-09-14-at-10.30.28-pm.jpeg`,
    available: true,
    implants: [
      { name: 'Biomet Arpe', image: `${WP}/picture1.png` },
      { name: 'Avanta Orthopaedics Braun-Cutter', image: `${WP}/picture1.jpg` },
      { name: 'Fixano Elektra', image: `${WP}/fianxo.jpg` },
      { name: 'Stryker Ivory', image: `${WP}/ivory.png` },
      { name: 'Moje Keramik-Implantate GmbH', image: `${WP}/moje.png` },
      { name: 'Stryker Moovis', image: `${WP}/moovis.png` },
      { name: 'Rubis II', image: `${WP}/rubis.png` },
      { name: 'Kerimedical Touch', image: `${WP}/touch.png` },
      { name: 'Roseland', image: `${WP}/rose.jpg` },
      { name: 'Groupe Lépine Maia', image: `${WP}/maia.png` },
    ],
  },
  {
    slug: 'finger',
    name: 'Finger',
    path: '/xray/finger',
    description: 'Finger joint prostheses and arthroplasty implants.',
    cover: `${BB}/whatsapp-image-2025-09-14-at-10.32.04-pm.jpeg`,
    available: true,
    implants: [
      { name: 'Pyrocarbon MCP Implant', image: `${WP}/oyrocarbon-1.jpg` },
      { name: 'Ascension Pyrocarbon PIP Total Joint', image: `${WP}/acsension.png` },
      { name: 'Tactys PIP Implant', image: `${WP}/tactys.jpg` },
      { name: 'Avanta PIP Silicone Implant', image: `${WP}/avanta.jpg` },
      { name: 'CapFlex PIP', image: `${WP}/capflex.jpg` },
    ],
  },
  {
    slug: 'ankle',
    name: 'Foot & ankle',
    path: '/xray/ankle',
    description: 'Total ankle replacements and arthrodesis implants.',
    cover: `${BB}/whatsapp-image-2025-09-15-at-2.37.52-am.jpeg`,
    available: false,
    implants: [],
  },
  {
    slug: 'elbow',
    name: 'Elbow',
    path: '/xray/elbow',
    description: 'Total elbow arthroplasty and radial head prostheses.',
    cover: `${BB}/whatsapp-image-2025-09-15-at-2.35.29-am-e1757884077286.jpeg`,
    available: false,
    implants: [],
  },
];

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);

export const publishedRegions = regions.filter((r) => r.available);

export const totalCatalogued = regions.reduce((n, r) => n + r.implants.length, 0);
