from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
import pandas as pd
from io import BytesIO
from PIL import Image
import tensorflow as tf
import requests

model_path = "../models/1"
class_names_csv = "../assets/class_names.csv"

__model = tf.keras.models.load_model(model_path)
__class_names = pd.read_csv(class_names_csv)["labels"].tolist()

__model_v1_endpoint = "http://localhost:8501/v1/models/plant_disease_model/version/1:predict"
__model_latest_endpoint = "http://localhost:8501/v1/models/plant_disease_model:predict"


app = FastAPI()


@app.get("/ping")
async def ping():
    return {"details": "Server is listening..."}


@app.get("/classes")
async def get_classes():
    return {
        "details": {
            "classes": __class_names
        }
    }


def convert_file_to_numpy(data) -> np.ndarray:
    return np.array(Image.open(BytesIO(data)))


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    file_bytes = await file.read()
    np_image = convert_file_to_numpy(file_bytes)
    image_batch = np.expand_dims(np_image, 0)
    predictions = __model.predict(image_batch)
    class_name = __class_names[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))
    return {
        "details": {
            "class": class_name,
            "confidence": confidence
        }
    }


@app.post("/predict-tfx")
async def predict(file: UploadFile = File(...)):
    file_bytes = await file.read()
    np_image = convert_file_to_numpy(file_bytes)
    image_batch = np.expand_dims(np_image, 0)
    body = {
        "instances": image_batch.tolist()
    }
    response = requests.post(__model_latest_endpoint, json=body)
    predictions = np.array(response.json()["predictions"][0])
    class_name = __class_names[np.argmax(predictions)]
    confidence = float(np.max(predictions))
    return {
        "details": {
            "class": class_name,
            "confidence": confidence
        }
    }


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
