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
  Linking,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const handleRegister = () => {
  const metodo_pago = value; // Método de pago seleccionado

    // URL de tu API
    var APIURL = "http://192.168.74.188/happyPedidosAPI/Usuarios/registerUser.php";

    fetch(APIURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nombre: nombre,
        Correo: correo,
        Contraseña: contraseña,
        Telefono: phone,
        Direccion: direccion,
        MetodoPago: metodo_pago,
      }),
    })
      .then((response) => {
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Imprime la respuesta de la API
        alert(data.Message);
        if (data.Message === "Registro exitoso.") {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.error('Error:', error); // Muestra el error en consola
        alert("Ocurrió un error al registrar el usuario.");
      });
};


  const handleLogin = () => {
    navigation.navigate("Login"); // Navega a HomeTabs
  };

  const [phone, setPhone] = useState("");
  const handlePhoneNumberChange = (text) => {
    // Filtra el texto permitiendo solo números
    const numericText = text.replace(/[^0-9]/g, "");
    // Si el texto tiene más de 8 caracteres, lo corta
    if (numericText.length <= 8) {
      setPhone(numericText);
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Efectivo", value: "cash" },
    { label: "Tarjeta", value: "card" },
  ]);

  const styles = StyleSheet.create({
    registerScreen: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    LoginImageHeaderContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    RegisterImageHeader: {
      width: 200,
      height: 200,
    },
    RegisterElements: {
      justifyContent: "flex-start",
      alignItems: "center",
      alignContent: "center",
      backgroundColor: "#FFFFFF",
      width: 350,
      height: "70%",
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    },
    RegisterHeader: {
      marginBottom: 10,
      marginTop: 30,
      color: "#000000",
      fontWeight: "bold",
      fontSize: 25,
      textTransform: "uppercase",
    },
    RegisterInputs: {
      height: 40,
      borderColor: "#EDE7E7",
      borderBottomWidth: 1,
      marginBottom: 20,
      width: 300,
      fontSize: 17,
    },
    RegisterInputsDropDownBox: {
      alignSelf: "center",
      height: 40,
      borderColor: "#EDE7E7",
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      marginBottom: 20,
      width: 315,
      padding: 0,
    },
    dropdownContainer: {
      backgroundColor: "#FFFFFF", // Fondo de la lista desplegable
      borderColor: "#EDE7E7",
      width: 315,
      alignSelf: "center",
    },
    labelStyle: {
      fontWeight: "Normal", // Estilo del texto seleccionado
      color: "#000",
      fontSize: 17,
    },
    itemStyle: {
      color: "#B4A3A3", // Estilo de cada ítem
      fontSize: 17,
    },
    placeholderStyle: {
      color: "#B4A3A3",
      fontSize: 17,
    },
    RegisterButtonContainer: {
      backgroundColor: "#F48C06",
      height: 45,
      borderRadius: 10,
      width: 300,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    RegisterButton: {
      color: "#FFFFFF",
      fontWeight: "bold",
      fontSize: 20,
      textTransform: "uppercase",
    },
    loginScreenLink: {
      fontSize: 15,
      textTransform: "uppercase",
      color: "#000000",
      marginTop: 30,
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
    },
  });

  return (
    <ImageBackground
      source={require("../imagenes/FondoLogin.png")}
      style={styles.registerScreen}
      resizeMode="cover"
    >
      <View style={styles.LoginImageHeaderContainer}>
        <Image
          source={require("../imagenes/Logo.png")}
          style={styles.RegisterImageHeader}
          resizeMode="contain"
        />
      </View>
      <View style={styles.RegisterElements}>
        <Text style={styles.RegisterHeader}>Registro</Text>
        <TextInput placeholder="Nombre" style={styles.RegisterInputs} value={nombre}  onChangeText={setNombre}/>
        <TextInput placeholder="Correo" style={styles.RegisterInputs} value={correo}  onChangeText={setCorreo}/>
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          style={styles.RegisterInputs}
          value={contraseña} onChangeText={setContraseña}
        />
        <TextInput
          placeholder="Teléfono"
          style={styles.RegisterInputs}
          keyboardType="numeric"
          value={phone}
          onChangeText={handlePhoneNumberChange}
        />
          <TextInput placeholder="Dirección" style={styles.RegisterInputs} value={direccion} onChangeText={setDireccion}/>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.RegisterInputsDropDownBox} // Caja de selección
          dropDownContainerStyle={styles.dropdownContainer} // Contenedor desplegable
          labelStyle={styles.labelStyle} // Estilo de los ítems
          listItemLabelStyle={styles.itemStyle} // Estilo de cada ítem
          dropDownDirection="BOTTOM"
          placeholder="Método de pago"
          placeholderStyle={styles.placeholderStyle} // Estilo del texto por defecto
        />
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.RegisterButtonContainer}
        >
          <Text style={styles.RegisterButton}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.loginScreenLink}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
