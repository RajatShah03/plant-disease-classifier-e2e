import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import PredictScreen from "./Components/PredictScreen";
import HomeScreen from "./Components/HomeScreen";

const Tab = createBottomTabNavigator();

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
