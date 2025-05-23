import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export default function BrightnessSlider() {
  const [brightness, setBrightness] = useState(50);

  const handleBrightnessChange = (value) => {
    setBrightness(value);
    // Aqui vai a lógica para enviar o comando via Bluetooth
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Brilho: {brightness}%</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        step={5}
        value={brightness}
        onValueChange={handleBrightnessChange}
        minimumTrackTintColor="#6200EE"
        maximumTrackTintColor="#303030"
        thumbTintColor="#6200EE"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});