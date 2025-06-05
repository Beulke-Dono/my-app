import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();
const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

let connectedDevice = null;

export const connectToLamp = async () => {
  try {
    // 1. Escaneia dispositivos
    const device = await manager.scanAndConnect([SERVICE_UUID], {
      scanMode: 1,
      callback: (error, device) => {
        if (error) throw error;
      }
    });

    // 2. Conecta e descobre serviços
    connectedDevice = await device.connect();
    await connectedDevice.discoverAllServicesAndCharacteristics();
    
    console.log('Conectado ao abajur!');
    return connectedDevice;

  } catch (error) {
    console.error('Erro na conexão:', error);
    throw error;
  }
};

export const sendCommand = async (command) => {
  if (!connectedDevice) throw new Error('Dispositivo não conectado');

  try {
    // Envia o comando conforme protocolo do Arduino
    await connectedDevice.writeCharacteristicWithResponseForService(
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      Buffer.from(command).toString('base64')
    );
  } catch (error) {
    console.error('Erro ao enviar comando:', error);
    throw error;
  }
};

// Comandos pré-definidos baseados no seu Arduino
export const commands = {
  turnOn: () => sendCommand('1'),
  turnOff: () => sendCommand('0'),
  setRed: () => sendCommand('R'),
  setGreen: () => sendCommand('G'),
  setBlue: () => sendCommand('B'),
  setWhite: () => sendCommand('W'),
  toggleMode: () => sendCommand('M')
};