# plant-disease-classifier-e2e

A deep learning based project for classifying different diseases in plant leaves like pepper, potato and tomato using Tensorflow, FastAPI, TFServe, TFLite, React and React Native

tf serving cmd docker:
docker run -t --rm -p 8501:8501 -v D:/Projects/plant-disease-classifier-e2e:/plant-disease-classifier tensorflow/serving --rest_api_port=8501 --model_config_file=/plant-disease-classifier/models.config

Expo mobile app run with env variable:
API_URL="https://host/predict" npx expo start
