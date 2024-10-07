import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

// Mapeo de nombres de imágenes a sus imports
const images = {
  "PizzaRocstar.png": require("../imagenes/PizzaRocstar.png"),
  "Taco3D.png": require("../imagenes/Taco3D.png"),
  "HamburgerRIP.png": require("../imagenes/HamburgerRIP.png"),
  "FreshFish.png": require("../imagenes/FreshFish.png"),
  // Añade más imágenes según sea necesario
};

export default function MenuScreen({ navigation }) {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Llama al archivo PHP para obtener los platos usando fetch
    fetch("http://192.168.1.4/happyPedidosAPI/Menu/getPlatos.php") // Cambia por la URL de tu servidor
      .then((response) => response.json())
      .then((data) => {
        setDishes(data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  const handleDishPress = (dish) => {
    // Navega a la pantalla de detalles del platillo (APLICAR MEJOR LOGICA CON SELECT CASE), este es solo un ejemplo
    if (dish.name == "Pizza Rockstar") {
      navigation.navigate("Shop");
    } else {
      navigation.navigate("Settings");
    }
  };
  const handleHomeScreen = () =>{
    navigation.navigate("Home");
  };


  return (
    <View style={styles.container}>
      {/* Logo y barra de búsqueda */}
      <View style={styles.header}>
      <TouchableOpacity onPress={handleHomeScreen}>
        <Image
          source={require("../imagenes/Logo.png")}
          style={styles.HomeImageHeader}
          resizeMode="contain"
        />
        </TouchableOpacity>
        <Icon name={"shopping-cart"} size={24} color={"#6A040F"} />
      </View>
      <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <Icon name="search" size={24} color="#FFF" />
        <Text style={styles.searchText}>Buscar...</Text>
      </View>
      </View>
      {/* Lista de platos */}
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={styles.menuFlatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleDishPress(item)}
            style={styles.productCard}
          >
            <Image
              style={styles.productImage}
              resizeMode="cover"
              source={images[item.image.split("/").pop()]} // Usa el nombre de archivo para obtener la imagen
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HomeImageHeader: {
    width: 60,
    height: 60,
  },
  searchBarContainer:{
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFA500",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    width: "92%"
  },
  searchText: {
    marginLeft: 10,
    color: "#FFF",
  },
  menuFlatList: {
    height: "100%",
  },
  productCard: {
    flex: 2,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
    paddingBottom: 10,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    marginTop: 5,
    color: "#800",
    fontSize: 16,
    fontWeight: "bold",
  },
});
