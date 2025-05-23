import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colorModes } from '../config/modes'

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    time: new Date(),
    action: 'on',
    mode: '1'
  });
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddSchedule = () => {
    if (!newSchedule.name.trim()) {
      alert('Por favor, dê um nome ao agendamento');
      return;
    }
    setSchedules([...schedules, newSchedule]);
    setShowModal(false);
    resetScheduleForm();
  };

  const resetScheduleForm = () => {
    setNewSchedule({
      name: '',
      time: new Date(),
      action: 'on',
      mode: '1'
    });
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setNewSchedule({...newSchedule, time: selectedTime});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agendamentos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {schedules.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum agendamento</Text>
      ) : (
        schedules.map((item, index) => (
          <View key={index} style={styles.scheduleItem}>
            <Text style={styles.scheduleName}>{item.name}</Text>
            <Text style={styles.scheduleDetails}>
              {item.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} | 
              {item.action === 'on' ? ' Ligar' : ' Desligar'} | 
              Modo {item.mode}
            </Text>
          </View>
        ))
      )}

      <Modal visible={showModal} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Novo Agendamento</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nome do agendamento"
            placeholderTextColor="#888"
            value={newSchedule.name}
            onChangeText={(text) => setNewSchedule({...newSchedule, name: text})}
          />

          <TouchableOpacity 
            style={styles.timePickerButton}
            onPress={() => setShowTimePicker(true)}>
            <Text style={styles.timePickerText}>
              Horário: {newSchedule.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={newSchedule.time}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
          )}

          <Text style={styles.sectionTitle}>Modo de Cor</Text>
          <View style={styles.modeContainer}>
            {colorModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.modeButton,
                  newSchedule.mode === mode.id && styles.selectedMode
                ]}
                onPress={() => setNewSchedule({...newSchedule, mode: mode.id})}>
                <Text style={styles.modeText}>{mode.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.actionButton, newSchedule.action === 'on' && styles.selectedAction]}
              onPress={() => setNewSchedule({...newSchedule, action: 'on'})}>
              <Text style={styles.actionText}>Ligar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, newSchedule.action === 'off' && styles.selectedAction]}
              onPress={() => setNewSchedule({...newSchedule, action: 'off'})}>
              <Text style={styles.actionText}>Desligar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerButtons}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setShowModal(false);
                resetScheduleForm();
              }}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleAddSchedule}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#6200EE',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    lineHeight: 30,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  scheduleList: {
    paddingHorizontal: 20,
  },
  scheduleItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scheduleText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  selectedAction: {
    backgroundColor: '#6200EE',
  },
  actionText: {
    color: 'white',
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#6200EE',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    padding: 15,
    backgroundColor: '#F44336',
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButtonText: {
    color: 'white',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%'
  },
  timePickerButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  timePickerText: {
    color: 'white',
    fontSize: 16
  },
  scheduleItem: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%'
  },
  scheduleName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  scheduleDetails: {
    color: '#aaa'
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center'
  },
  modalTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 8 // Adicione espaçamento entre os botões
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    marginVertical: 15,
    alignSelf: 'flex-start'
  },
  selectedMode: {
    backgroundColor: '#6200EE'
  },
  modeText: {
    color: 'white',
    textAlign: 'center'
  },
  modeButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    minWidth: '48%',
    flexGrow: 1
  },
});