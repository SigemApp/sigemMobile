import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

type Material = {
  nome: string;
  quantidade: number;
};

type Part = {
  nome: string;
  quantidade: number;
};

type Maintenance = {
  id: string;
  nome: string;
  status: string;
  data: string;
  descricao: string;
  os: string;  
  equipe: string;  
  tipo: string;              
  dataPrevisao: string;     
  materiais: Material[];  
  pecas: Part[];
};

const MaintenanceList: React.FC = () => {
  const mockMaintenances: Maintenance[] = [
    {
      id: '1',
      nome: 'Máquina A',
      status: 'em preparo',
      data: '2023-09-01',
      descricao: 'Troca de óleo e revisão geral',
      os: 'OS-001',  
      equipe: 'Equipe A', 
      tipo: 'Preventiva',                
      dataPrevisao: '2023-09-05',   
      materiais: [{ nome: 'Óleo', quantidade: 5 }],
      pecas: [{ nome: 'Filtro', quantidade: 2 }],
    },
    {
      id: '2',
      nome: 'Máquina B',
      status: 'pronto para execução',
      data: '2023-09-05',
      descricao: 'Verificação de sistemas hidráulicos',
      os: 'OS-002', 
      equipe: 'Equipe B',  
      tipo: 'Corretiva',            
      dataPrevisao: '2023-09-10',    
      materiais: [{ nome: 'Óleo Hidráulico', quantidade: 3 }],
      pecas: [{ nome: 'Válvula', quantidade: 1 }],
    },
    {
      id: '3',
      nome: 'Máquina C',
      status: 'em serviço',
      data: '2023-09-10',
      descricao: 'Reparo de motor',
      os: 'OS-003',  
      equipe: 'Equipe C',  
      tipo: 'Corretiva',                 
      dataPrevisao: '2023-09-15',    
      materiais: [{ nome: 'Óleo', quantidade: 4 }],
      pecas: [{ nome: 'Bujão', quantidade: 3 }],
    },
  ];

  const statusOptions = [
    'em preparo',
    'pronto para execução',
    'em serviço',
    'concluído',
    'cancelado',
    'atrasado'
  ];

  const [search, setSearch] = useState('');
  const [filteredMaintenances, setFilteredMaintenances] = useState(mockMaintenances);
  const [isDetailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [newStatus, setNewStatus] = useState('');

  const handleSearchChange = (text: string) => {
    setSearch(text);
    const filtered = text
      ? mockMaintenances.filter(maintenance =>
          maintenance.nome.toLowerCase().includes(text.toLowerCase())
        )
      : mockMaintenances;
    setFilteredMaintenances(filtered);
  };

  const handleMaintenancePress = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setNewStatus(maintenance.status);
    setDetailModalVisible(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedMaintenance(null);
  };

  const handleSaveStatus = () => {
    if (selectedMaintenance) {
      selectedMaintenance.status = newStatus;
      setDetailModalVisible(false);
      setSelectedMaintenance(null);
    }
  };

  const renderMaintenance = ({ item, index }: { item: Maintenance, index: number }) => {
    const backgroundColor = index % 2 === 0 ? 'white' : '#f0f0f0';
    
    return (
      <TouchableOpacity
        onPress={() => handleMaintenancePress(item)}
        style={{
          flexDirection: 'row',
          padding: 12,
          backgroundColor,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        }}
      >
        <Text style={{ flex: 0.6, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.os}</Text> 
        <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.nome}</Text>
        <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.status}</Text>
        <Text style={{ flex: 1, fontSize: 16, color: '#333', textAlign: 'center' }}>{item.data}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#070419' }}>
        Manutenções
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#070419',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f8f8f8',
      }}>
        <Icon name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Buscar manutenção..."
          style={{
            flex: 1,
            padding: 8,
            fontSize: 16,
            color: '#333',
          }}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#070419',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      }}>
        <Text style={{ flex: 0.6, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>OS</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Máquina</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Status</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Data</Text>
      </View>
      <FlatList
        data={filteredMaintenances}
        keyExtractor={(item) => item.id}
        renderItem={renderMaintenance}
        ListEmptyComponent={<Text style={{ textAlign: 'center', fontSize: 16, color: '#999' }}>Nenhuma manutenção encontrada.</Text>}
      />

      {/* Modal de detalhes da manutenção */}
      <Modal isVisible={isDetailModalVisible}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 8,
          padding: 20,
        }}>
          {selectedMaintenance && (
            <>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedMaintenance.nome}</Text>
              <Text>OS: {selectedMaintenance.os}</Text>
              <Text>Status: {selectedMaintenance.status}</Text>
              <Text>Data: {selectedMaintenance.data}</Text>
              <Text>Descrição: {selectedMaintenance.descricao}</Text>
              
              <Text>Equipe: {selectedMaintenance.equipe}</Text>
              <Text>Tipo de Manutenção: {selectedMaintenance.tipo}</Text>  
              <Text>Data de Previsão: {selectedMaintenance.dataPrevisao}</Text> 

              <Text style={{ marginTop: 10 }}>Materiais Usados:</Text>
              {selectedMaintenance.materiais && selectedMaintenance.materiais.length > 0 ? (
                selectedMaintenance.materiais.map((material, index) => (
                  <Text key={index}>{material.quantidade}x {material.nome}</Text>
                ))
              ) : (
                <Text>Nenhum material usado.</Text>
              )}

              <Text style={{ marginTop: 10 }}>Peças Usadas:</Text>
              {selectedMaintenance.pecas && selectedMaintenance.pecas.length > 0 ? (
                selectedMaintenance.pecas.map((peca, index) => (
                  <Text key={index}>{peca.quantidade}x {peca.nome}</Text>
                ))
              ) : (
                <Text>Nenhuma peça usada.</Text>
              )}

              <Text style={{ marginTop: 10 }}>Novo Status:</Text>
              <Picker
                selectedValue={newStatus}
                onValueChange={(itemValue) => setNewStatus(itemValue)}
                style={{
                  borderWidth: 1,
                  borderColor: '#070419',
                  borderRadius: 4,
                  marginTop: 5,
                }}
              >
                {statusOptions.map((status) => (
                  <Picker.Item key={status} label={status} value={status} />
                ))}
              </Picker>
              <TouchableOpacity onPress={handleSaveStatus} style={{
                backgroundColor: '#070419',
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Salvar Status</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseDetailModal} style={{
                backgroundColor: '#999',
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Fechar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default MaintenanceList;
