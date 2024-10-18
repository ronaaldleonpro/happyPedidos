import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome.js";

import LoginScreen from "./screens/Login.js";
import HomeScreen from "./screens/Home.js";
import SettingsScreen from "./screens/Settings.js";
import RegisterScreen from "./screens/Registro.js";
import ShopScreen from "./screens/Shop.js";
import PaymentScreen from "./screens/Payment.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ setIsAuthenticated }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          }
          else if (route.name === "Favorite") {
            iconName = "heart";
          }
          else if (route.name === "Shop") {
            iconName = "clock-o";
          }
          else if (route.name === "Settings") {
            iconName = "user";
          }
          return <Icon name={iconName} size={24} color={color} />;
        },
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#6A040F", // Color para la pestaña activa
        tabBarInactiveTintColor: "gray", // Color para la pestaña inactiva
        tabBarStyle: {
          padding: 0, // Espaciado inferior
          borderTopWidth: 0,
          elevation: 0, // Elimina sombra en Android
          shadowOpacity: 0, // Elimina sombra en iOS
        },
      })}
    >
      <Tab.Screen name="Home" options={{ headerShown: false }}>
        {(props) => (
          <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Favorite">
        {(props) => (
          <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Shop">
        {(props) => (
          <ShopScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {(props) => (
          <SettingsScreen {...props} setIsAuthenticated={setIsAuthenticated} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="HomeTabs"
              options={{ headerShown: false }}
            >
              {(props) => (
                <HomeTabs {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            </Stack.Screen>

            {/* Aquí agregamos la pantalla de Payment */}
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ title: "Método de Pago" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="Registro" options={{ headerShown: false }}>
              {(props) => (
                <RegisterScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
