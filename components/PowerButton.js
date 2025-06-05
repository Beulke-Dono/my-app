import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { sendCommand } from '../services/bluetoothService';

export default function PowerButton({ isConnected }) {
  const { theme } = useTheme();
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sincroniza com o estado real do dispositivo
  useEffect(() => {
    // Aqui você pode adicionar lógica para verificar o estado atual do abajur
    // quando a conexão é estabelecida
  }, [isConnected]);

  const togglePower = async () => {
    if (!isConnected) {
      Alert.alert('Conecte-se primeiro', 'Por favor, conecte ao abajur antes de controlá-lo');
      return;
    }

    setIsLoading(true);
    try {
      const newState = !isOn;
      // Envia o comando Bluetooth (1 para ligar, 0 para desligar)
      await sendCommand(newState ? '1' : '0');
      setIsOn(newState);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível controlar o abajur');
      console.error('Bluetooth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cores dinâmicas baseadas no tema
  const buttonColors = {
    on: theme.primary,       // Cor quando ligado
    off: theme.secondary,    // Cor quando desligado
    disabled: theme.surface  // Cor quando desconectado
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: !isConnected 
              ? buttonColors.disabled
              : isOn 
                ? buttonColors.on 
                : buttonColors.off
          }
        ]}
        onPress={togglePower}
        disabled={isLoading || !isConnected}
        activeOpacity={0.7}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={styles.text}>
            {!isConnected ? 'Conecte-se' : isOn ? 'Desligar' : 'Ligar'}
          </Text>
        )}
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
    elevation: 3, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});