import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Alert,
  Navigat
} from "react-native";

export default function PaymentScreen({ navigation }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleCardNumberChange = (text) => {
    const formattedText = text.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedText);
  };

  //Valida que solo acepten 16 dígitos en el numero de tarjeta
  const handleCardNumberInput = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 16) {
      handleCardNumberChange(cleaned);
    }
  };

  //Valida formato mm/yy para vencimiento
  const handleExpiryDateChange = (text) => {
    const formattedText = text
      .replace(/[^0-9]/g, "")
      .replace(/^([2-9])$/g, "0$1")
      .replace(/^(1{1})([3-9]{1})$/g, "12")
      .replace(/^([0-1]{1}[0-9]{1})([0-9]{0,2}).*/g, "$1/$2");

    setExpiryDate(formattedText);
  };

  //Valida que solo se acepten 3 digitos en CVV
  const handleCvvChange = (text) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 3) {
      setCvv(cleaned);
    }
  };

const handlePayment = () => {
  if (cardName && cardNumber && expiryDate && cvv) {
    setModalVisible(true);

    var APIURL = "http://192.168.74.188/happyPedidosAPI/Menu/update.php";

    fetch(APIURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: 22,
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

        if (data.Message === "Actualizacion exitosa") {
          navigation.navigate("Home"); //
        } else {
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        Alert.alert('Error', 'Ocurrió un error al procesar el pago');
      });

  } else {
    setErrorModalVisible(true);
  }
};


  const clearForm = () => {
    setCardName("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Historial de Compra</Text>

      <View style={styles.paymentForm}>
        <View style={styles.cardIconsContainer}>
          <Image
            source={require("../imagenes/Mastercard.png")}
            style={styles.cardIcon}
          />
          <Image source={require("../imagenes/Visa.png")} style={styles.cardIcon} />
        </View>

        <Text style={styles.label}>Nombre de la tarjeta</Text>
        <TextInput
          value={cardName}
          onChangeText={setCardName}
          style={styles.input}
        />

        <Text style={styles.label}>No. Tarjeta</Text>
        <TextInput
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChangeText={handleCardNumberInput}
          keyboardType="numeric"
          maxLength={19}
          style={styles.input}
        />

        <View style={styles.rowInputs}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Vencimiento</Text>
            <TextInput
              placeholder="mm/yy"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              style={styles.smallInput}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          <View style={{ flex: 1,  }}>
            <Text style={styles.labelCvv}>CVV</Text>
            <TextInput
              placeholder="CVV"
              value={cvv}
              onChangeText={handleCvvChange}
              keyboardType="numeric"
              style={[styles.smallInput, styles.rightInput]}
              maxLength={3}
            />
          </View>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal</Text>
        <Text style={styles.summaryText}>$43.00</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>IVA</Text>
        <Text style={styles.summaryText}>$4.30</Text>
      </View>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total</Text>
        <Text style={styles.summaryText}>$47.30</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successHeader}>¡Éxito!</Text>
            <Text style={styles.successMessage}>
              Su pago se realizó correctamente. Se le ha enviado un recibo de esta compra a su correo electrónico.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => { clearForm(); setModalVisible(false); navigation.goBack();}}>
              <Text style={styles.closeButtonText}>Regresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={errorModalVisible} onRequestClose={() => setErrorModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.errorModalContent}>
            <Text style={styles.errorHeader}>¡Error!</Text>
            <Text style={styles.errorMessage}>
              Por favor complete todos los campos antes de proceder con el pago.
            </Text>
            <TouchableOpacity style={styles.closeButtonError} onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.closeButtonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 60,
    textAlign: "center",
  },
  paymentForm: {
    backgroundColor: "#DBDBDB",
    padding: 25,
    borderRadius: 25,
    marginBottom: 20,
  },
  cardIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  cardIcon: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  input: {
    height: 50,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 25,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallInput: {
    width: "92%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
    rightInput: {
      marginLeft: 15,
    },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#F48C06",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  successHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#28A745",
    marginBottom: 15,
  },
  successMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButtonError: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  errorModalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  errorHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF0000",
    marginBottom: 15,
  },
  errorMessage: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15
    ,
  },
    labelCvv: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 15,
      marginTop: 15,
      paddingHorizontal: 15,
    },
});
