import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { colorModes } from '../config/modes'

export default function ColorModePicker() {
  const [selectedMode, setSelectedMode] = useState(null);

  const selectMode = (mode) => {
    setSelectedMode(mode);
    // Aqui vai a lógica para enviar o comando via Bluetooth
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modos de Cor</Text>
      <FlatList
        data={colorModes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.modeButton,
              selectedMode?.id === item.id && styles.selectedMode
            ]}
            onPress={() => selectMode(item)}
          >
            <Text style={styles.modeText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  modeButton: {
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  selectedMode: {
    backgroundColor: '#6200EE',
  },
  modeText: {
    color: 'white',
  },
});