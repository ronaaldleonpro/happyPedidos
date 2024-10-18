import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const InsertRecord = () => {
    console.log("InsertRecord se está ejecutando");

    if (email.length === 0 || password.length === 0) {
      alert("¡Los campos son obligatorios!");
      return;
    }

    var APIURL = "http://192.168.0.37/happyPedidosAPI/Usuarios/loginUser.php"; // Asegúrate de que esta URL sea correcta

    fetch(APIURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);

        if (data.Message === "Inicio de sesión exitoso") {
          //alert("Inicio de sesión exitoso");
          setIsAuthenticated(true); // Establecer el estado de autenticación
          navigation.navigate("HomeTabs"); // Redirigir a la pantalla principal
        } else {
          alert(data.Message);
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("Ocurrió un error al intentar iniciar sesión");
      });
  };

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
          value={email}
          onChangeText={setEmail}
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
          onPress={InsertRecord}
          style={styles.loginButtonContainer}
        >
          <Text style={styles.loginButton}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={styles.registrarseScreenLink}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  LoginImageHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  LoginImageHeader: {
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
    marginBottom: 10,
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
  registrarseScreenLink: {
    fontSize: 15,
    textTransform: "uppercase",
    color: "#000000",
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },
});
