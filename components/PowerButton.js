import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../hooks/HookTheme';

export default function PowerButton() {

  const { theme } = useTheme();

  const [isOn, setIsOn] = useState(false);

  const togglePower = () => {
    setIsOn(!isOn);
    // Aqui vai a lógica para enviar o comando via Bluetooth
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isOn ? styles.on : styles.off]}
        onPress={togglePower}
      >
        <Text style={styles.text}>{isOn ? 'Desligar' : 'Ligar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  on: {
    backgroundColor: '#F44336',
  },
  off: {
    backgroundColor: '#4CAF50',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});