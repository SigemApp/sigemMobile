import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputField from '../components/inputField';
import Button from '../components/button';
import Icon from 'react-native-vector-icons/Ionicons';

type StackParamList = {
  Register: undefined;
  HomeTabs: undefined;
  Login: undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Register'>;

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  const navigation = useNavigation<NavigationProps>();

  const handleRegister = () => {
    if (username && password && confirmPassword) {
      if (password === confirmPassword) {
        setIsSuccess(true);
        setModalMessage('Cadastro realizado com sucesso!');
        setModalVisible(true);
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000);
      } else {
        setIsSuccess(false);
        setModalMessage('As senhas não coincidem.');
        setModalVisible(true);
      }
    } else {
      setIsSuccess(false);
      setModalMessage('Preencha todos os campos.');
      setModalVisible(true);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#070419', padding: 20 }}>
      <StatusBar hidden={false} />
      <Text style={{ fontSize: 40, color: 'white', marginBottom: 32 }}>Cadastro</Text>

      <View style={{ marginBottom: 16, width: '83%' }}>
        <InputField
          label="Usuário"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={{ marginBottom: 16, width: '83%' }}>
        <InputField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={{ marginBottom: 16, width: '83%' }}>
        <InputField
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>

      <View style={{ marginBottom: 30 }}>
        <Button
          title="Cadastrar"
          onPress={handleRegister}
          color="#A9A9A9"
          textColor="#FFFFFF"
          fontSize={18}
          height={50}
          width={100}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#D3D3D3', fontSize: 14, marginTop: 20 }}>Já tem uma conta? Faça login!</Text>
      </TouchableOpacity>

      {/* Modal para exibir mensagens de sucesso ou erro */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: '80%', padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' }}>
            <Icon name={isSuccess ? 'checkmark-circle' : 'close-circle'} size={50} color={isSuccess ? 'green' : 'red'} />
            <Text style={{ fontSize: 18, marginVertical: 20, textAlign: 'center' }}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: '#007BFF', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
