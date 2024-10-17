import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';

const ShopScreen = ({ navigation }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [orderSummary, setOrderSummary] = useState({ total: 0, iva: 0, ordenId: 0 }); // Cambié el estado a "ordenId"
  const [loading, setLoading] = useState(false);

  // Cargar resumen de pedido desde la API
  useEffect(() => {
    fetch('http://localhost/happyPedidosAPI/Menu/getShop.php')
      .then(response => response.json())
      .then(data => setOrderSummary(data)) // Cambié "setShop" a "setOrderSummary"
      .catch(error => {
        console.error(error);
        Alert.alert("Error", "No se pudo cargar el resumen del pedido.");
      });
  }, []);

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Atención", "Seleccione un método de pago.");
      return;
    }

    setLoading(true);
    fetch('http://localhost/happyPedidosAPI/Menu/completePurchase.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethod: selectedPaymentMethod,
        orderId: orderSummary.ordenId, // Asegúrate de que "ordenId" está disponible
      }),
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          Alert.alert("Compra completada", "Gracias por tu compra.");
          navigation.navigate('Home'); // Navegar a otra pantalla tras la compra
        } else {
          Alert.alert("Error", "Hubo un problema al procesar la compra.");
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert("Error", "No se pudo completar la compra.");
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resumen del pedido</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.text}>Orden: ${orderSummary.orden}</Text>
        <Text style={styles.text}>IVA: ${orderSummary.iva}</Text>
        <Text style={styles.totalText}>Total: ${orderSummary.total}</Text>
        <Text style={styles.text}>Tiempo estimado de entrega: 15-30 mins</Text>
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.sectionTitle}>Métodos de pago</Text>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === 'credit_card' && styles.selectedOption,
          ]}
          onPress={() => setSelectedPaymentMethod('credit_card')}
        >
          <Image
            source={require('../imagenes/Mastercard.png')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Tarjetas de crédito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === 'debit_card' && styles.selectedOption,
          ]}
          onPress={() => setSelectedPaymentMethod('debit_card')}
        >
          <Image
            source={require('../imagenes/Visa.png')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Tarjeta de débito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOption,
            selectedPaymentMethod === 'cash' && styles.selectedOption,
          ]}
          onPress={() => setSelectedPaymentMethod('cash')}
        >
          <Image
            source={require('../imagenes/Cash.png')}
            style={styles.paymentIcon}
          />
          <Text style={styles.paymentText}>Efectivo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.payButton, !selectedPaymentMethod && styles.disabledButton]}
        onPress={handlePayment}
        disabled={!selectedPaymentMethod || loading}
      >
        <Text style={styles.payButtonText}>{loading ? 'Procesando...' : 'Pagar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos en línea
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethods: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#d1e7ff',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  paymentText: {
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ShopScreen;
