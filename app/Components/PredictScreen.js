import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Background from "../assets/background.jpg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const PredictScreen = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const launchCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPrediction(null);
      setError(null);
      setImage(result.assets[0]);
    }
  };

  const launchGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setPrediction(null);
      setError(null);
      setImage(result.assets[0]);
    }
  };

  const clearResults = () => {
    setImage(null);
    setPrediction(null);
    setError(null);
  };

  const requestPrediction = async (params) => {
    setIsLoading(true);
    const body = new FormData();
    body.append("file", params);
    try {
      const url = Constants.expoConfig.extra.apiUrl;
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPrediction(result.data.details);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log("Error", e);
      setError("Oops!! An error occured");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={image ? 2 : 0}
        source={Background}
        style={styles.imageBackground}
        resizeMode="stretch"
        resizeMethod="auto"
      >
        <View style={styles.contentContainer}>
          <View style={styles.topContainer}>
            {image && (
              <Pressable style={styles.clear} onPress={clearResults}>
                <Ionicons name="close" size={20} color="white" />
              </Pressable>
            )}
          </View>
          <View style={styles.middleContainer}>
            {image ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <Pressable
                  style={styles.predictButton}
                  onPress={() =>
                    requestPrediction({
                      uri: image.uri,
                      name: "test",
                      type: "image/jpeg",
                    })
                  }
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Ionicons name="checkmark" size={40} color="white" />
                  )}
                </Pressable>
              </View>
            ) : (
              <Text style={styles.descriptionText}>
                Take a picture of the leaf or select from gallery that you want
                to get results for...
              </Text>
            )}
            {prediction && (
              <View style={styles.predictionContainer}>
                <Text style={styles.predictionText}>
                  Class: {prediction.class}
                </Text>
                <Text style={styles.predictionText}>
                  Confidence: {(prediction.confidence * 100).toFixed(2)}%
                </Text>
              </View>
            )}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
              </View>
            )}
          </View>
          <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={launchCamera}>
              <Text style={styles.buttonText}>Camera</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={launchGallery}>
              <Text style={styles.buttonText}>Gallery</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PredictScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContainer: {
    alignSelf: "flex-end",
  },
  middleContainer: {},
  imageContainer: {
    width: 360,
    height: 360,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 4,
    position: "relative",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionText: {
    marginBottom: 24,
    fontSize: 26,
    fontWeight: "600",
    color: "rgb(5, 150, 126)",
    textAlign: "center",
  },
  button: {
    padding: 12,
    width: 150,
    backgroundColor: "rgb(5, 150, 126)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  predictButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(5, 150, 126, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    transform: [{ translateX: 150 }, { translateY: 160 }],
  },
  clear: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "rgb(5, 150, 126)",
    justifyContent: "center",
    alignItems: "center",
  },
  predictionContainer: {
    width: 350,
    height: 80,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(235, 250, 207, 0.6)",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  predictionText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(5, 120, 126)",
  },
  errorContainer: {
    width: 350,
    height: 80,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(252, 194, 196, 0.8)",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 12,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgb(240, 105, 110)",
  },
});
