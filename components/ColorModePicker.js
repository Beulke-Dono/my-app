import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';

// Modos pré-configurados (mantidos conforme seu código original)
const colorModes = [
  { id: '1', name: 'Branco Quente' },
  { id: '2', name: 'Branco Frio' },
  { id: '3', name: 'Ambiente' },
  { id: '4', name: 'Concentração' },
  { id: '5', name: 'Relaxamento' },
];

export default function ColorModePicker({ onSelectMode, disabled }) {
  const { theme } = useTheme();
  const [selectedMode, setSelectedMode] = useState(null);

  const selectMode = (modeId) => {
    if (disabled) return;
    
    setSelectedMode(modeId);
    // Envia o comando no formato "M<modo>" (ex: "M1") - ajuste conforme seu Arduino
    onSelectMode(`M${modeId}`); 
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Modos de Cor</Text>
      <FlatList
        data={colorModes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.modeButton,
              { backgroundColor: disabled ? theme.surface : theme.primary },
              selectedMode === item.id && styles.selectedMode
            ]}
            onPress={() => selectMode(item.id)}
            disabled={disabled}
          >
            <Text style={styles.modeText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// Mantendo SEUS estilos originais (apenas ajustando cores dinâmicas)
const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
  },
  title: {
    color: theme => theme.text, // Cor dinâmica
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
    borderRadius: 10,
  },
  selectedMode: {
    opacity: 0.8,
  },
  modeText: {
    color: 'white',
    textAlign: 'center',
  },
});