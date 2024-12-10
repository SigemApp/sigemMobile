import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

interface StockItem {
  id: string;
  name: string;
  code: string;
  quantity: number;
  unitPrice: number;
  type: string;
}

interface Service {
  id: string;
  name: string;
}

interface Machine {
  id: string;
  name: string;
}

interface Team {
  id: string;
  name: string;
}

const initialStockItems: StockItem[] = [
  { id: '1', name: 'Produto A', code: 'A001', quantity: 10, unitPrice: 15.0, type: 'piece' },
  { id: '2', name: 'Produto B', code: 'A002', quantity: 8, unitPrice: 20.0, type: 'piece' },
  { id: '3', name: 'Produto C', code: 'A003', quantity: 5, unitPrice: 12.0, type: 'piece' },
  { id: '4', name: 'Material A', code: 'B001', quantity: 3, unitPrice: 5.0, type: 'material' },
  { id: '5', name: 'Material B', code: 'B002', quantity: 7, unitPrice: 8.0, type: 'material' },
  { id: '6', name: 'Material C', code: 'B003', quantity: 12, unitPrice: 6.0, type: 'material' },
];

const teams: Team[] = [
  { id: '1', name: 'Equipe A' },
  { id: '2', name: 'Equipe B' },
  { id: '3', name: 'Equipe C' },
  { id: '4', name: 'Equipe D' },
];

const services: Service[] = [
  { id: '1', name: 'Serviço A' },
  { id: '2', name: 'Serviço B' },
];

const machines: Machine[] = [
  { id: '1', name: 'Máquina A' },
  { id: '2', name: 'Máquina B' },
];

const MaintenanceForm: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
  const [priority, setPriority] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');
  const [maintenanceType, setMaintenanceType] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<StockItem[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [showItemModal, setShowItemModal] = useState<boolean>(false);
  const [showServiceModal, setShowServiceModal] = useState<boolean>(false);
  const [showMachineModal, setShowMachineModal] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [itemType, setItemType] = useState<string>('');

  const navigation = useNavigation();

  const handleSave = () => {
    const maintenance = {
      description,
      date,
      priority,
      responsible,
      type: maintenanceType,
      files,
      comments,
      items: selectedItems,
      services: selectedServices,
      machine: selectedMachine,
    };
    console.log(maintenance); 
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSelectItem = (item: StockItem) => {
    setSelectedItems([...selectedItems, item]);
    setShowItemModal(false);
  };

  const handleSelectService = (service: Service) => {
    setSelectedServices([...selectedServices, service]);
    setShowServiceModal(false);
  };

  const handleSelectMachine = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowMachineModal(false);
  };

  const handleDayPress = (day: any) => {
    setDate(day.dateString);
    setShowCalendar(false);
  };

  const handleRequestOrder = (item: StockItem) => {
    alert(`Solicitar ordem de compra para: ${item.name}`);
  };

  const renderItem = ({ item }: { item: StockItem }) => (
    <TouchableOpacity
      onPress={() => handleSelectItem(item)}
      style={{
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        backgroundColor: item.quantity < 5 ? '#FFCCCB' : item.quantity < 10 ? '#FFFFE0' : '#fff',
      }}>
      <Text style={{ flex: 2, padding: 4, textAlign: 'center' }}>{item.name}</Text>
      <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>{item.code}</Text>
      <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>{item.quantity}</Text>
      <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>
        {item.quantity < 5 ? 'Crítico' : item.quantity < 10 ? 'Alerta' : 'Normal'}
      </Text>
      <Text style={{ flex: 1.5, padding: 4, textAlign: 'center' }}>R$ {item.unitPrice.toFixed(2)}</Text>
      {item.quantity < 10 && (
        <TouchableOpacity onPress={() => handleRequestOrder(item)} style={{ padding: 4, alignItems: 'center' }}>
          <Text style={{ color: 'blue' }}>Solicitar Ordem</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderItemModal = () => {
    const filteredItems = initialStockItems.filter(item => item.type === itemType);

    return (
      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => handleSelectItem(item)}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  borderColor: '#ccc',
                  paddingVertical: 10,
                  backgroundColor: item.quantity < 5 ? '#FFCCCB' : item.quantity < 10 ? '#FFFFE0' : '#fff',
                }}>
                <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>{item.name}</Text>
                <Text style={{ flex: 1, padding: 4, textAlign: 'center' }}>{item.quantity}</Text>
              </TouchableOpacity>

              {item.quantity < 10 && (
                <TouchableOpacity
                  onPress={() => handleRequestOrder(item)}
                  style={{ padding: 4, alignItems: 'center' }}>
                  <Text style={{ color: 'blue', textAlign: 'center' }}>Solicitar Ordem</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    );
  };



  return (
    <Modal transparent={false} animationType="slide" visible={true}>
      <View style={{ flex: 1, backgroundColor: '#ffff', padding: 20 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
            Cadastro de Manutenção
          </Text>

          <Text>Data da Solicitação:</Text>
          <TouchableOpacity onPress={() => setShowCalendar(true)} style={{ marginBottom: 20 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 4,
                padding: 10,
                backgroundColor: '#fff',
              }}
              value={date}
              editable={false}
            />
          </TouchableOpacity>

          {showCalendar && (
            <View style={{ marginBottom: 20 }}>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={{ [date]: { selected: true } }}
                style={{ marginBottom: 20 }}
              />
              <Button title="Fechar" onPress={() => setShowCalendar(false)} />
            </View>
          )}

          <Text>Prioridade:</Text>
          <Picker
            selectedValue={priority}
            style={{
              height: 50,
              width: '100%',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              marginBottom: 20,
              backgroundColor: '#fff',
            }}
            onValueChange={(itemValue: string) => setPriority(itemValue)}
          >
            <Picker.Item label="Selecione uma prioridade" value="" />
            <Picker.Item label="Baixa" value="Baixa" />
            <Picker.Item label="Média" value="Média" />
            <Picker.Item label="Alta" value="Alta" />
            <Picker.Item label="Imediata" value="Imediata" />
          </Picker>

          <Text>Equipe Responsável:</Text>
          <Picker
            selectedValue={responsible}
            style={{
              height: 50,
              width: '100%',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              marginBottom: 20,
              backgroundColor: '#fff',
            }}
            onValueChange={(itemValue: string) => setResponsible(itemValue)}
          >
            <Picker.Item label="Selecione uma equipe" value="" />
            {teams.map(team => (
              <Picker.Item key={team.id} label={team.name} value={team.id} />
            ))}
          </Picker>

          <Text>Tipo de Manutenção:</Text>
          <Picker
            selectedValue={maintenanceType}
            style={{
              height: 50,
              width: '100%',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              marginBottom: 20,
              backgroundColor: '#fff',
            }}
            onValueChange={(itemValue: string) => setMaintenanceType(itemValue)}
          >
            <Picker.Item label="Selecione um tipo" value="" />
            <Picker.Item label="Preventiva" value="Preventiva" />
            <Picker.Item label="Corretiva" value="Corretiva" />
          </Picker>

          <Text>Descrição:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              padding: 10,
              height: 100,
              backgroundColor: '#fff',
              marginBottom: 20,
            }}
            multiline
            value={description}
            onChangeText={setDescription}
          />

          <View style={{ borderWidth: 1, borderColor: '#070419', borderRadius: 10, padding: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Selecionar</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, margin: 5 }} onPress={() => setShowMachineModal(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Máquina</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, margin: 5 }} onPress={() => setShowItemModal(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Itens</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#070419', borderRadius: 5, padding: 10, flex: 1, margin: 5 }} onPress={() => setShowServiceModal(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Serviços</Text>
              </TouchableOpacity>
            </View>
          </View>


          {selectedItems.length > 0 && (
            <View>
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Itens Selecionados:</Text>
              {selectedItems.map(item => (
                <Text key={item.id}>{item.name}</Text>
              ))}
            </View>
          )}

          {selectedServices.length > 0 && (
            <View>
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Serviços Selecionados:</Text>
              {selectedServices.map(service => (
                <Text key={service.id}>{service.name}</Text>
              ))}
            </View>
          )}

          {selectedMachine && (
            <View>
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Máquina Selecionada:</Text>
              <Text>{selectedMachine.name}</Text>
            </View>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#070419',
                padding: 10,
                borderRadius: 5,
                flex: 1,
                marginRight: 5,
                alignItems: 'center',
              }}
              onPress={handleSave}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#ccc',
                padding: 10,
                borderRadius: 5,
                flex: 1,
                alignItems: 'center',
              }}
              onPress={handleCancel}
            >
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal de Itens */}
        <Modal visible={showItemModal} transparent={true} animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 10,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              maxHeight: '70%',
              width: '80%',
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Selecionar Itens</Text>

              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={() => setItemType('piece')}
                  style={{
                    flex: 1,
                    backgroundColor: itemType === 'piece' ? '#070419' : '#ccc',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: itemType === 'piece' ? '#fff' : '#000', fontWeight: 'bold' }}>Peça</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setItemType('material')}
                  style={{
                    flex: 1,
                    backgroundColor: itemType === 'material' ? '#070419' : '#ccc',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: itemType === 'material' ? '#fff' : '#000', fontWeight: 'bold' }}>Material</Text>
                </TouchableOpacity>
              </View>

              {renderItemModal()}

              <TouchableOpacity
                style={{
                  backgroundColor: '#D3D3D3',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  marginTop: 10,
                }}
                onPress={() => setShowItemModal(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de Serviços */}
        <Modal visible={showServiceModal} transparent={true} animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 10,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              maxHeight: '70%',
              width: '80%',
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Selecionar Serviços</Text>
              {services.map(service => (
                <TouchableOpacity key={service.id} onPress={() => handleSelectService(service)}>
                  <Text style={{ padding: 10 }}>{service.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: '#D3D3D3',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  marginTop: 10,
                }}
                onPress={() => setShowServiceModal(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal de Máquinas */}
        <Modal visible={showMachineModal} transparent={true} animationType="slide">
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 10,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              maxHeight: '70%',
              width: '80%',
            }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Selecionar Máquina</Text>
              {machines.map(machine => (
                <TouchableOpacity key={machine.id} onPress={() => handleSelectMachine(machine)}>
                  <Text style={{ padding: 10 }}>{machine.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={{
                  backgroundColor: '#D3D3D3',
                  padding: 10,
                  borderRadius: 5,
                  alignItems: 'center',
                  marginTop: 10,
                }}
                onPress={() => setShowMachineModal(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>


    </Modal>
  );
};

export default MaintenanceForm;










  