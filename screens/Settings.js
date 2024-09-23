import React from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SettingsScreen({ navigation, setIsAuthenticated }) {
  const handleLogout = () => {
    setIsAuthenticated(false); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="cogs" size={50} color="black" />
      <Text style={{ fontSize: 24 }}>Pantalla de Configuración</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}