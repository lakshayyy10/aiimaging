# api.py
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import io
import re
from model import get_model, preprocess_image, CLASS_NAMES

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",               # Local development
        "https://lakshayy10.github.io",        # GitHub Pages domain
        "https://aiimaging-1.onrender.com",    # Render domain (your API domain)
        "*"                                    # Allow all origins temporarily for debugging
    ],
    allow_credentials=False,  # Set to False when using "*" origin
    allow_methods=["*"],
    allow_headers=["*"],
)





# Load model
model = get_model(num_classes=len(CLASS_NAMES))
model.load_state_dict(torch.load("efficientnet_b3_best_model.pth", map_location=torch.device("cpu")))
model.eval()

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    input_tensor = preprocess_image(image)

    with torch.no_grad():
        output = model(input_tensor)
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


