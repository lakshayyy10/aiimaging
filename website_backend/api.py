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

# Load TensorFlow .h5 model
wrist_model = tf.keras.models.load_model("wrist_model.h5")

def preprocess_tf_image(image: Image.Image, target_size=(224, 224)):
    image = image.resize(target_size)
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

@app.post("/predict/wrist")
async def predict_wrist(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = preprocess_tf_image(image)

    prediction = wrist_model.predict(input_tensor)
    pred_index = int(np.argmax(prediction))
    confidence = float(np.max(prediction))

    return {
        "prediction": f"Wrist Class {pred_index}",
        "confidence": round(confidence, 4)
    }

@app.post("/predict/")
async def predict_pytorch(file: UploadFile = File(...)):
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

@app.get("/")
def read_root():
    return {"status": "API is running"}
