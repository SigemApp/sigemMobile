import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const maintenanceStatuses = {
  COMPLETED: 'Concluída',
  PENDING: 'Pendente',
  DELAYED: 'Atrasada',
};

type Employee = {
  id: number;
  name: string;
  entryDate: string;
  exitDate?: string;
};

type Maintenance = {
  id: number;
  osNumber: string;
  status: string;
  startDate: string;
  endDate: string;
};

type Team = {
  id: string;
  name: string;
  leader: string;
  employees: Employee[];
  maintenances: Maintenance[];
};

const initialTeams: Team[] = [
  {
    id: '1',
    name: 'Equipe Alpha',
    leader: 'João Silva',
    employees: [
      { id: 1, name: 'Ana Costa', entryDate: '2023-01-01', exitDate: '2023-08-01' },
      { id: 2, name: 'Pedro Santos', entryDate: '2023-03-01' },
      { id: 3, name: 'Mariana Lima', entryDate: '2023-05-01', exitDate: '2023-09-01' },
    ],
    maintenances: [
      { id: 1, osNumber: 'OS001', status: maintenanceStatuses.COMPLETED, startDate: '2023-08-01', endDate: '2023-08-05' },
      { id: 2, osNumber: 'OS002', status: maintenanceStatuses.PENDING, startDate: '2023-09-01', endDate: '2023-09-10' },
    ],
  },
  {
    id: '2',
    name: 'Equipe Omega',
    leader: 'Fernanda Almeida',
    employees: [
      { id: 4, name: 'Lucas Rocha', entryDate: '2023-06-01' },
      { id: 5, name: 'Bianca Nascimento', entryDate: '2023-07-01' },
      { id: 6, name: 'Carlos Dias', entryDate: '2023-07-15', exitDate: '2023-09-05' },
    ],
    maintenances: [
      { id: 3, osNumber: 'OS003', status: maintenanceStatuses.DELAYED, startDate: '2023-09-05', endDate: '2023-09-15' },
    ],
  },
  {
    id: '3',
    name: 'Equipe Beta',
    leader: 'Roberta Mendes',
    employees: [
      { id: 7, name: 'Eduardo Pires', entryDate: '2023-08-10' },
      { id: 8, name: 'Isabela Martins', entryDate: '2023-08-15' },
      { id: 9, name: 'Thiago Lima', entryDate: '2023-09-01' },
    ],
    maintenances: [],
  },
];

const TeamManagementScreen = () => {
  const [teams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [membersModalVisible, setMembersModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedLeader, setEditedLeader] = useState('');

  const openTeamModal = (team: Team) => {
    setSelectedTeam(team);
    setEditedName(team.name);
    setEditedLeader(team.leader);
    setModalVisible(true);
  };

  const handleEditTeam = () => {
    if (selectedTeam) {
      const updatedTeam = { ...selectedTeam, name: editedName, leader: editedLeader };
      setModalVisible(false);
    }
  };

  const renderEmployeeItem = ({ item }: { item: Employee }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
      <Text style={{ flex: 0.5, textAlign: 'center' }}>{item.id}</Text>
      <Text style={{ flex: 2, textAlign: 'center' }}>{item.name}</Text>
      <Text style={{ flex: 1, textAlign: 'center' }}>{item.entryDate}</Text>
      <Text style={{ flex: 1, textAlign: 'center' }}>{item.exitDate ? item.exitDate : 'Ainda na equipe'}</Text>
    </View>
  );

  const renderMaintenanceItem = ({ item }: { item: Maintenance }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case maintenanceStatuses.COMPLETED:
          return 'green';
        case maintenanceStatuses.PENDING:
          return 'orange';
        case maintenanceStatuses.DELAYED:
          return 'red';
        default:
          return 'black';
      }
    };

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
        <Text style={{ flex: 1, textAlign: 'center' }}>{item.osNumber}</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>{item.startDate}</Text>
        <Text style={{ flex: 1, textAlign: 'center' }}>{item.endDate}</Text>
        <Text style={{ flex: 1, textAlign: 'center', color: getStatusColor(item.status) }}>
          {item.status}
        </Text>
      </View>
    );
  };

  const renderTeamItem = ({ item }: { item: Team }) => (
    <TouchableOpacity onPress={() => openTeamModal(item)} style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{item.name}</Text>
      <Text>Líder: {item.leader}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Gerenciamento de Equipes</Text>

      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={renderTeamItem}
      />

      {/* Modal de Informações da Equipe */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{
            width: '100%',
            maxHeight: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
          }}>
            {selectedTeam && (
              <>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{selectedTeam.name}</Text>
                <Text style={{ marginVertical: 10 }}>Líder: {selectedTeam.leader}</Text>

                <Text style={{ marginVertical: 10 }}>Histórico de Manutenções:</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Número da OS</Text>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Data de Início</Text>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Data de Fim</Text>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Status</Text>
                </View>
                <FlatList
                  data={selectedTeam.maintenances}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderMaintenanceItem}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 50 }}>
                  <View style={{ flex: 1, marginRight: 5 }}>
                    <Button
                      title="Listar Membros"
                      onPress={() => { setMembersModalVisible(true); setModalVisible(false); }}
                      color="#070419"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5, marginBottom: 30 }}>
                    <Button
                      title="Editar Equipe"
                      onPress={() => { setEditModalVisible(true); setModalVisible(false); }}
                      color="#070419"
                    />
                  </View>
                </View>

                <Button title="Fechar" onPress={() => setModalVisible(false)} color="#D3D3D3" />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal para Listar Membros */}
      <Modal visible={membersModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 10 }}>
          {selectedTeam && (
            <>
              <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 10, width: '100%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Membros da {selectedTeam.name}</Text>

                {/* Cabeçalho da Tabela */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 }}>
                  <Text style={{ flex: 0.5, fontWeight: 'bold', textAlign: 'center' }}>ID</Text>
                  <Text style={{ flex: 2, fontWeight: 'bold', textAlign: 'center' }}>Nome</Text>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Data de Entrada</Text>
                  <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Data de Saída</Text>
                </View>

                <FlatList
                  data={selectedTeam.employees}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderEmployeeItem}
                />

                <Button title="Fechar" onPress={() => setMembersModalVisible(false)} color="#D3D3D3" />
              </View>
            </>
          )}
        </View>
      </Modal>

      {/* Modal de Edição da Equipe */}
      <Modal visible={editModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, width: '90%' }}>
            <Text style={{ fontSize: 20, marginBottom: 30, textAlign: "center" }}>Editar Equipe</Text>
            <Text>Insira o novo nome da equipe</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingLeft: 8 }}
              placeholder="Nome da equipe"
              value={editedName}
              onChangeText={setEditedName}
            />
            <Text>Insira o novo líder</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingLeft: 8 }}
              placeholder="Líder da equipe"
              value={editedLeader}
              onChangeText={setEditedLeader}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <View style={{ marginRight: 50 }}>
                <Button title="Salvar" onPress={handleEditTeam} color="#070419" />
              </View>
              <View>
                <Button title="Fechar" onPress={() => setEditModalVisible(false)} color="#C0C0C0" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TeamManagementScreen;
