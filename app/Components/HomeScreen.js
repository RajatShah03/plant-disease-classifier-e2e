import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Background from "../assets/background.jpg";
import Tomatoes from "../assets/tomatoes.jpg";
import Potatoes from "../assets/potatoes.jpg";
import Pepper from "../assets/pepper.jpg";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        blurRadius={0.8}
        source={Background}
        style={styles.imageBackground}
        resizeMode="stretch"
        resizeMethod="auto"
      >
        <Text style={styles.text}>Healthify Plants</Text>
        <View style={styles.contentContainer}>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={Potatoes}
              resizeMode="cover"
            />
            <View style={styles.cardDescription}>
              <Text style={styles.cardDescTextL}>Common diseases include</Text>
              <Text style={styles.cardDescText}>Early blight</Text>
              <Text style={styles.cardDescText}>Late blight</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={Tomatoes}
              resizeMode="cover"
            />
            <View style={styles.cardDescription}>
              <Text style={styles.cardDescTextL}>Common diseases include</Text>
              <Text style={styles.cardDescText}>Bacterial spot</Text>
              <Text style={styles.cardDescText}>Early blight</Text>
              <Text style={styles.cardDescText}>Late blight</Text>
              <Text style={styles.cardDescText}>Leaf Mold</Text>
              <Text style={styles.cardDescText}>Septoria leaf spot</Text>
              <Text style={styles.cardDescText}>
                Spider mites Two spotted spider mite
              </Text>
              <Text style={styles.cardDescText}>Target Spot</Text>
              <Text style={styles.cardDescText}>
                Tomato YellowLeaf Curl Virus
              </Text>
              <Text style={styles.cardDescText}>Tomato mosaic virus</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Image
              style={styles.cardImage}
              source={Pepper}
              resizeMode="cover"
            />
            <View style={styles.cardDescription}>
              <Text style={styles.cardDescTextL}>Common diseases include</Text>
              <Text style={styles.cardDescText}>Bacterial spot</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "rgb(5, 190, 126)",
  },
  imageBackground: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  contentContainer: {
    marginVertical: 20,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(235, 250, 207, 0.6)",
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  cardImage: {
    width: 120,
    height: 120,
    borderRadius: 2,
    overflow: "hidden",
  },
  cardDescription: {
    flex: 1,
    marginLeft: 12,
  },
  cardDescTextL: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgb(5, 180, 126)",
  },
  cardDescText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgb(5, 120, 126)",
  },
});
