import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import LoginScreen from "./screens/Login.js";
import HomeScreen from "./screens/Home.js";
import SettingsScreen from "./screens/Settings.js";
import RegisterScreen from "./screens/Registro.js";

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
          } else if (route.name === "Settings") {
            iconName = "cogs";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue", // Color para la pestaña activa
        tabBarInactiveTintColor: "gray", // Color para la pestaña inactiva
        tabBarStyle: {
          paddingBottom: 5, // Espaciado inferior
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => (
          <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />
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
        {!isAuthenticated ? (
          <>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>

           <Stack.Screen name="Registro" options={{ headerShown: false }} >
            {(props) => (
              <RegisterScreen {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>

          <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
            {(props) => (
              <HomeTabs {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
        </>
        ) : (
          <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
            {(props) => (
              <HomeTabs {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}