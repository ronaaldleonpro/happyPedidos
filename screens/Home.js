import React from "react";
import { View, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function HomeScreen({ navigation, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon name="home" size={50} color="black" />
      <Text style={{ fontSize: 24 }}>Pantalla Principal</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}
