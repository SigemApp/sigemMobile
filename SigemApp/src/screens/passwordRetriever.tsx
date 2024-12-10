import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Modal } from 'react-native';
import InputField from '../components/inputField';
import Button from '../components/button';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type ForgotPasswordScreenProps = {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [modalMessage, setModalMessage] = useState('');

  const handleSendEmail = () => {
    if (email) {
      setTimeout(() => {
        setIsSuccess(true);
        setModalMessage('Instruções para redefinir sua senha foram enviadas para o seu e-mail.');
        setModalVisible(true);

        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }, 8000);
      }, 1000);
    } else {
      setIsSuccess(false);
      setModalMessage('Por favor, insira um e-mail válido.');
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Login');
      }, 8000);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#070419', padding: 20 }}>
      <StatusBar hidden={false} />
      <Text style={{ fontSize: 40, color: 'white', marginBottom: 32 }}>Esqueceu a Senha</Text>

      <View style={{ marginBottom: 16, width: '83%' }}>
        <InputField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={{ marginBottom: 30 }}>
        <Button
          title="Enviar"
          onPress={handleSendEmail}
          color="#A9A9A9"
          textColor="#FFFFFF"
          fontSize={18}
          height={50}
          width={100}
        />
      </View>

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
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              navigation.navigate('Login');
            }} style={{ marginTop: 10 }}>
              <Text style={{ color: '#007BFF', fontSize: 16 }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPasswordScreen;
