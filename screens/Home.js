import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const images = {
  "PizzaRocstar.png": require("../imagenes/PizzaRocstar.png"),
  "Taco3D.png": require("../imagenes/Taco3D.png"),
  "Baileys.png": require("../imagenes/Baileys.png"),
  "CocaCola.png": require("../imagenes/CocaCola.png"),
  "M&M.png": require("../imagenes/M&M.png"),
  "Oreo.png": require("../imagenes/Oreo.png"),
  "Sandwich.png": require("../imagenes/Sandwich.png"),
  "QuesoDedo.png": require("../imagenes/QuesoDedo.png"),
};

export default function MenuScreen({ navigation }) {
  const [dishes, setDishes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [activeFilter, setActiveFilter] = useState("todo"); // Estado para el filtro activo

  useEffect(() => {
    fetch("http://192.168.74.188/happyPedidosAPI/Menu/getPlatos.php")
      .then((response) => response.json())
      .then((data) => {
        setDishes(data);
        setFilteredDishes(data);
      })
      .catch((error) => {
        console.log("Error al obtener los datos:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = dishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDishes(filtered);
  }, [searchText, dishes]);

  const handleFilterOption = (option) => {
    setActiveFilter(option); // Actualiza el filtro activo
    const filtered =
      option === "todo"
        ? dishes
        : dishes.filter((dish) =>
            (dish.description || "")
              .toLowerCase()
              .includes(option.toLowerCase())
          );
    //console.log("Filtrado para opción:", option, filtered);
    setFilteredDishes(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
          <TextInput
            style={styles.searchTextInput}
            placeholder="Buscar"
            placeholderTextColor="#FFF"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <View style={styles.miniMenuContainer}>
        <TouchableOpacity
          style={styles.miniMenuOptionTouch}
          onPress={() => handleFilterOption("todo")}
        >
          <Text
            style={[
              styles.miniMenuOption,
              activeFilter === "todo" && styles.activeOption,
              activeFilter !== "todo" && styles.inactiveOption,
            ]}
          >
            Todo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.miniMenuOptionTouch}
          onPress={() => handleFilterOption("comida")}
        >
          <Text
            style={[
              styles.miniMenuOption,
              activeFilter === "comida" && styles.activeOption,
              activeFilter !== "comida" && styles.inactiveOption,
            ]}
          >
            Comida
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.miniMenuOptionTouch}
          onPress={() => handleFilterOption("bebida")}
        >
          <Text
            style={[
              styles.miniMenuOption,
              activeFilter === "bebida" && styles.activeOption,
              activeFilter !== "bebida" && styles.inactiveOption,
            ]}
          >
            Bebida
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.miniMenuOptionTouch}
          onPress={() => handleFilterOption("snack")}
        >
          <Text
            style={[
              styles.miniMenuOption,
              activeFilter === "snack" && styles.activeOption,
              activeFilter !== "snack" && styles.inactiveOption,
            ]}
          >
            Snacks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.miniMenuOptionTouch}
          onPress={() => handleFilterOption("dulce")}
        >
          <Text
            style={[
              styles.miniMenuOption,
              activeFilter === "dulce" && styles.activeOption,
              activeFilter !== "dulce" && styles.inactiveOption,
            ]}
          >
            Dulces
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={styles.menuFlatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Shop", { dish: item })}
            style={styles.productCard}
          >
            <Image
              style={styles.productImage}
              resizeMode="cover"
              source={images[item.image.split("/").pop()]}
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
  searchBarContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFA500",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    width: "92%",
  },
  searchTextInput: {
    marginLeft: 10,
    color: "#FFF",
    flex: 1,
  },
  miniMenuContainer: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  miniMenuOptionTouch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  miniMenuOption: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  activeOption: {
    color: "#6A040F", // Color activo
    textDecorationLine: "underline", // Estilo subrayado
  },
  inactiveOption: {
    color: "gray", // Color inactivo
  },
  menuFlatList: {
    height: "100%",
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 0,
    paddingBottom: 10,
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
