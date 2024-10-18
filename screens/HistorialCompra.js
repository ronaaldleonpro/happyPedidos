import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const HistorialCompra = () => {
  const route = useRoute();
  const { carrito } = route.params; 

  const eliminarProducto = (id) => {
    
  };

  const totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

  const renderProducto = ({ item }) => (
    <View style={styles.producto}>
      <Image source={item.imagen} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text>Cantidad: {item.cantidad}</Text>
        <Text>Precio: ${item.precio.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => eliminarProducto(item.id)} style={styles.eliminar}>
        <Text style={styles.eliminarTexto}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de compra</Text>
      <Text>Tienes {carrito.length} artículos en tu carrito</Text>
      
      <FlatList
        data={carrito}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProducto}
      />

      <View style={styles.total}>
        <Text style={styles.totalTexto}>Total: ${totalCompra.toFixed(2)}</Text>
        <Button title="Comprar" onPress={() => { /* Lógica para completar la compra */ }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  producto: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  imagen: { width: 80, height: 80 },
  info: { flex: 1, marginLeft: 20 },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  eliminar: { padding: 10 },
  eliminarTexto: { fontSize: 20, color: 'red' },
  total: { marginTop: 20, alignItems: 'center' },
  totalTexto: { fontSize: 20, fontWeight: 'bold' },
});

export default HistorialCompra;