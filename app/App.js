import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Background from "./assets/background.jpg";
import Tomatoes from "./assets/tomatoes.jpg";
import Potatoes from "./assets/potatoes.jpg";
import Pepper from "./assets/pepper.jpg";
import Ionicons from "@expo/vector-icons/Ionicons";

const classes = [
  "Pepper__bell___Bacterial_spot",
  "Pepper__bell___healthy",
  "Potato___Early_blight",
  "Potato___Late_blight",
  "Potato___healthy",
  "Tomato_Bacterial_spot",
  "Tomato_Early_blight",
  "Tomato_Late_blight",
  "Tomato_Leaf_Mold",
  "Tomato_Septoria_leaf_spot",
  "Tomato_Spider_mites_Two_spotted_spider_mite",
  "Tomato__Target_Spot",
  "Tomato__Tomato_YellowLeaf__Curl_Virus",
  "Tomato__Tomato_mosaic_virus",
  "Tomato_healthy",
];

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        style={styles.imageBackground}
        resizeMode="stretch"
        resizeMethod="auto"
      >
        <Text style={styles.text}>Healthy Plants</Text>
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

const PredictScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={Background}
        style={styles.imageBackground}
        resizeMode="stretch"
        resizeMethod="auto"
      >
        <View>
          <Text>Predict</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "leaf" : "leaf-outline";
              } else if (route.name === "Predict") {
                iconName = focused ? "search" : "search-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "rgb(5, 179, 126)",
            tabBarInactiveTintColor: "rgb(2, 194, 136)",
            tabBarStyle: { backgroundColor: "rgb(230, 250, 241)" },
            headerStyle: {
              backgroundColor: "rgb(230, 250, 241)",
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Predict" component={PredictScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
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
    color: "black",
  },
  cardDescText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
});
