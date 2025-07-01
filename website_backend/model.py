# --- model.py ---
import random
import torch
import numpy as np
import os
import torch.nn as nn
from torchvision.models import efficientnet_b3, EfficientNet_B3_Weights
from torchvision import transforms
from PIL import Image
from torch.utils.data import Dataset

CLASS_NAMES = [
    "Accumed Polarus", "Arthex Inverse", "Arthex universe", "Biomet Bio-Angular",
    "Biomet Comprehensive", "Biomet verso", "DJO Encore Reverse",
    "DePuy Global Advantage CTA Head    ", "Depuy Delta", "Depuy Global",
    "EXATECH Equinox", "Evolutis UNIC", "Exatech Interspace", "Stryker O leary",
    "Stryker solar", "Tornier Aequalis Modular", "Tornier Press Fit", "Zimmer Bigliani",
    "Zimmer Biomet Sidus", "Zimmer Fenlin total shoulder system", "simth and nephew promos"
]

MODEL_PATH = "efficientnet_b3_best_model.pth"
IMAGE_SIZE = 300  # EfficientNetB3 uses 300x300 by default

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def get_model(num_classes: int):
    weights = EfficientNet_B3_Weights.DEFAULT
    model = efficientnet_b3(weights=weights)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, num_classes)
    return model

def preprocess_image(image: Image):
    preprocess = transforms.Compose([
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),  # EfficientNet expects 300x300
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225]),
    ])
    return preprocess(image).unsqueeze(0)  # Add batch dimension

class ShoulderImplantDataset(Dataset):
    def __init__(self, root_dir, transform=None, min_images_per_class=10, max_images_per_class=15, excluded_class="TORNIER Simpliciti"):
        self.image_paths = []
        self.labels = []
        self.classes = []
        self.transform = transform

        for class_name in sorted(os.listdir(root_dir)):
            class_path = os.path.join(root_dir, class_name)
            if not os.path.isdir(class_path) or class_name == excluded_class:
                continue
            images = [img for img in os.listdir(class_path) if img.lower().endswith(('.jpg', '.png'))]
            if len(images) >= min_images_per_class:
                self.classes.append(class_name)
                images = random.sample(images, min(len(images), max_images_per_class))
                for img in images:
                    self.image_paths.append(os.path.join(class_path, img))
                    self.labels.append(class_name)

        self.class_to_idx = {cls_name: i for i, cls_name in enumerate(sorted(self.classes))}
        self.labels = [self.class_to_idx[label] for label in self.labels]

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        image = np.array(Image.open(self.image_paths[idx]).convert("RGB"))
        label = self.labels[idx]
        if self.transform:
            image = self.transform(image=image)["image"]
        return image, label
