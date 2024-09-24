import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking 
} from "react-native";

const USERNAME = "usuario";
const PASSWORD = "123";

export default function LoginScreen({ navigation, setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === USERNAME && password === PASSWORD) {
      setIsAuthenticated(true); // Cambia el estado de autenticación
      navigation.navigate("HomeTabs"); // Navega a HomeTabs
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  const handleRegistrarse = () =>{
    navigation.navigate("Registro"); // Navega a HomeTabs
  };
  
  const styles = StyleSheet.create({
    loginScreen: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    LoginImageHeaderContainer:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    LoginImageHeader:{
      width: 200,
      height: 200,
    },
    loginElements: {
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      width: 350,
      height: "70%",
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    loginHeader: {
      marginBottom: 20,
      marginTop: 30,
      color: "#000000",
      fontWeight: "bold",
      fontSize: 25,
      textTransform: "uppercase",
    },
    loginInputs: {
      height: 40,
      borderColor: "#EDE7E7",
      borderBottomWidth: 1,
      marginBottom: 20,
      width: 300,
      fontSize: 17,
    },
    loginButtonContainer: {
      backgroundColor: "#F48C06",
      height: 45,
      borderRadius: 10,
      width: 300,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    loginButton: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 20,
      textTransform: "uppercase",
    },
    registrarseScreenLink:{
      fontSize: 15,
      textTransform: "uppercase",
      color: "#000000",
      marginTop: 30,
      borderBottomWidth: 1,
      borderBottomColor: "#000000"
    }
  });

  return (
    <ImageBackground
      source={require("../imagenes/FondoLogin.png")}
      style={styles.loginScreen}
      resizeMode="cover"
    >
      <View style={styles.LoginImageHeaderContainer}>
        <Image
          source={require("../imagenes/Logo.png")}
          style={styles.LoginImageHeader}
          resizeMode="contain"
        />
      </View>
      <View style={styles.loginElements}>
        <Text style={styles.loginHeader}>¡Bienvenido!</Text>
        <TextInput
          placeholder="Correo"
          value={username}
          onChangeText={setUsername}
          style={styles.loginInputs}
        />
        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.loginInputs}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButtonContainer}
        >
          <Text style={styles.loginButton}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegistrarse}>
            <Text style={styles.registrarseScreenLink}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
