from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import torch
import tensorflow as tf
import numpy as np
from model import get_model, preprocess_image, CLASS_NAMES

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://lakshayy10.github.io",
        "*"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load PyTorch model (if needed)
pytorch_model = get_model(num_classes=len(CLASS_NAMES))
pytorch_model.load_state_dict(torch.load("efficientnet_b3_best_model.pth", map_location=torch.device("cpu")))
pytorch_model.eval()

# Load TensorFlow .h5 model - Updated path to match Flask version
wrist_model = tf.keras.models.load_model("wrist79_model.h5")

# Define class labels for wrist model (from Flask code)
WRIST_CLASS_LABELS = [
    "Depuy Bias", "Depuy total modular wrist system", "Fischer Medical Universal 2",
    "Pyrodisk", "Swemac Motec", "Tornier-Bioprofile APSI", "Tornier-Bioprofile Amandys",
    "Tornier-Bioprofile Eclypse", "Wright Medical-Tornier STPI", "Zimmer Biomet Maestro", "RCPI"
]

def preprocess_tf_image(image: Image.Image, target_size=(224, 224)):
    """Preprocess image for TensorFlow model"""
    image = image.resize(target_size)
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

@app.post("/predict/wrist")
async def predict_wrist(file: UploadFile = File(...)):
    """Predict wrist X-ray type using TensorFlow model"""
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Preprocess image
        input_tensor = preprocess_tf_image(image)
        
        # Make prediction
        prediction = wrist_model.predict(input_tensor)
        pred_index = int(np.argmax(prediction))
        confidence = float(np.max(prediction))
        
        # Get predicted label using class labels
        predicted_label = WRIST_CLASS_LABELS[pred_index]
        
        return {
            "prediction": predicted_label,
            "confidence": round(confidence, 4)
        }
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

@app.post("/predict/")
async def predict_pytorch(file: UploadFile = File(...)):
    """Predict using PyTorch model"""
    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        input_tensor = preprocess_image(image)
        
        with torch.no_grad():
            output = pytorch_model(input_tensor)
            probs = torch.nn.functional.softmax(output, dim=1)
            pred_index = torch.argmax(probs, dim=1).item()
            confidence = torch.max(probs).item()
        
        return {
            "prediction": CLASS_NAMES[pred_index],
            "confidence": round(confidence, 4)
        }
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

@app.get("/")
def read_root():
    return {"status": "API is running"}
