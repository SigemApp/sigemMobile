import React, { useState, useEffect } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock de dados do perfil
const mockUserProfile = {
  id: '12345',
  username: 'João Silva',
  email: 'joao.silva@example.com',
  password: 'password123',
  profileImage: 'https://example.com/path/to/profile/photo.jpg',
  position: 'Mecânico de Manutenção II',
  lastAccess: '2024-09-20 - 14h55',
  team: {
    name: 'Equipe C',
    entryDate: '2024-07-08',
  },
  maintenanceHistory: [
    {
      os: '12345',
      machine: 'Máquina XYZ',
      team: 'Equipe C',
      date: '2024-08-15',
    },
    {
      os: '67890',
      machine: 'Máquina ABC',
      team: 'Equipe C',
      date: '2024-07-10',
    },
  ],
};

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState(mockUserProfile.email);
  const [password, setPassword] = useState(mockUserProfile.password);
  const [photoUri, setPhotoUri] = useState(mockUserProfile.profileImage);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const savedImageUri = await AsyncStorage.getItem('profileImage');
        if (savedImageUri) {
          setPhotoUri(savedImageUri);
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    loadImage();
  }, []);

  const handleEditProfile = async () => {
    try {
      await AsyncStorage.setItem('profileImage', photoUri);
    } catch (error) {
      console.error("Error saving image:", error);
    }
    setModalVisible(false);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("É necessário permitir o acesso à galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: 20 }}>
      <Image source={{ uri: photoUri }} style={{ width: 150, height: 150, borderRadius: 90, marginBottom: 20 }} />
      <Text style={{ fontSize: 40, color: '#070419', marginBottom: 20 }}>{mockUserProfile.username}</Text>
      <Text style={{ fontSize: 23, color: '#070419' }}>{mockUserProfile.position}</Text>
      <Text style={{ fontSize: 23, color: '#070419', marginBottom: 20 }}>{mockUserProfile.team.name}</Text>
      <Text style={{ color: '#070419', marginBottom: 5 }}>Desde de: {mockUserProfile.team.entryDate}</Text>
      <Text style={{ color: '#070419' }}>Último Acesso: {mockUserProfile.lastAccess}</Text>

      <Text style={{ marginTop: 20, fontSize: 18, color: '#070419'}}>Histórico de Manutenções:</Text>
      <View style={{ width: '100%', marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', backgroundColor: '#A9A9A9', padding: 10 }}>
          <Text style={{ flex: 0.6, color: 'white', fontWeight: 'bold', textAlign:'center' }}>OS</Text>
          <Text style={{ flex: 1, color: 'white', fontWeight: 'bold', textAlign:'center' }}>Máquina</Text>
          <Text style={{ flex: 1, color: 'white', fontWeight: 'bold', textAlign:'center' }}>Equipe</Text>
          <Text style={{ flex: 1, color: 'white', fontWeight: 'bold', textAlign:'center' }}>Data</Text>
        </View>
        {mockUserProfile.maintenanceHistory.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', backgroundColor: index % 2 === 0 ? 'white' : '#f2f2f2', padding: 10 }}>
            <Text style={{ flex: 0.6, color: '#070419', textAlign:'center' }}>{item.os}</Text>
            <Text style={{ flex: 1, color: '#070419', textAlign:'center' }}>{item.machine}</Text>
            <Text style={{ flex: 1, color: '#070419', textAlign:'center' }}>{item.team}</Text>
            <Text style={{ flex: 1, color: '#070419', textAlign:'center' }}>{item.date}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 30, backgroundColor: '#A9A9A9', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* Modal para editar o perfil */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
            <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#f0f0f0', padding: 15, borderRadius: 5, marginBottom: 15, width: '100%', alignItems: 'center' }}>
              <Text style={{ color: '#070419' }}>Clique aqui para selecionar a foto</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Alterar Email</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, width: '100%', paddingLeft: 10 }}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
            />
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Alterar Senha</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, width: '100%', paddingLeft: 10 }}
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <TouchableOpacity onPress={handleEditProfile} style={{ backgroundColor: '#070419', padding: 10, borderRadius: 5, marginRight: 10, flex: 1 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#A9A9A9', padding: 10, borderRadius: 5, flex: 1 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileScreen;
