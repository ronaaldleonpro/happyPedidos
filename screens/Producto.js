import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const Producto = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { producto } = route.params; // Recibe el producto seleccionado

  const [cantidad, setCantidad] = useState(1);

  const incrementarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };

  const agregarAlCarrito = () => {
    // 
    navigation.navigate('HistorialCompra', {
      carrito: [{ ...producto, cantidad }] // Pasamos el producto al carrito
    });
  };

  return (
    <View style={styles.container}>
      <Image source={producto.imagen} style={styles.imagen} />
      <Text style={styles.nombre}>{producto.nombre}</Text>
      <Text style={styles.detalles}>{producto.detalle}</Text>
      <Text style={styles.precio}>Precio: ${producto.precio}</Text>

      <View style={styles.contador}>
        <Text style={styles.label}>Porción</Text>
        <TouchableOpacity onPress={disminuirCantidad} style={styles.boton}>
          <Text style={styles.botonTexto}>-</Text>
        </TouchableOpacity>
        <Text style={styles.cantidad}>{cantidad}</Text>
        <TouchableOpacity onPress={incrementarCantidad} style={styles.boton}>
          <Text style={styles.botonTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Total: ${(producto.precio * cantidad).toFixed(2)}</Text>

      <Button title="Agregar al carrito" onPress={agregarAlCarrito} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  imagen: { width: 200, height: 200, alignSelf: 'center' },
  nombre: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  detalles: { fontSize: 16, color: '#555', marginVertical: 10 },
  precio: { fontSize: 20, color: '#333', marginVertical: 10 },
  contador: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 20 },
  label: { fontSize: 18, marginRight: 10 },
  boton: { padding: 10, backgroundColor: '#eee', marginHorizontal: 10 },
  botonTexto: { fontSize: 20 },
  cantidad: { fontSize: 18, marginHorizontal: 10 },
  total: { fontSize: 20, fontWeight: 'bold', marginVertical: 20, alignSelf: 'center' }
});

export default Producto;