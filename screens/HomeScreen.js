import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import PowerButton from '../components/PowerButton';
import BrightnessSlider from '../components/BrightnessSlider';
import ColorModePicker from '../components/ColorModePicker';
import ScheduleList from '../components/ScheduleList';

export default function HomeScreen() {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Abajur Inteligente</Text>
        
        <PowerButton isConnected={isConnected} />
                
        <ColorModePicker 
          onSelectMode={handleColorChange}
          disabled={!isConnected}
        />
                
        <ScheduleList />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
});