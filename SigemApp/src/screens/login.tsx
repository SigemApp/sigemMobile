import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import InputField from '../components/inputField';
import Button from '../components/button';

type StackParamList = {
  Login: undefined;
  HomeTabs: undefined;  
  Register: undefined; 
  Forgot: undefined; 
};

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<NavigationProps>(); 

  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);

    if (username && password) {
      navigation.navigate('HomeTabs'); 
    } else {
      console.log('Preencha todos os campos');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Forgot'); 
  };

  const handleHelp = () => {
    console.log('Help');
  };

  const handleRegister = () => {
    navigation.navigate('Register'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#070419', padding: 20 }}>
      <StatusBar hidden={false} />
      <Text style={{ fontSize: 40, color: 'white', marginBottom: 32 }}>Login</Text>
      
      <View style={{ marginBottom: 16, width: '83%' }}>
        <InputField
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={{ marginBottom: 16, width: '83%' }}>
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      
      <View style={{ marginBottom: 30 }}>
        <Button
          title="Login"
          onPress={handleLogin}  
          color="#A9A9A9" 
          textColor="#FFFFFF"
          fontSize={18}
          height={50}
          width={100}
        />
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={{ color: '#D3D3D3', fontSize: 14, marginBottom: 8, marginTop: 40 }}>Esqueceu a senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}> 
        <Text style={{ color: '#D3D3D3', fontSize: 14, marginBottom: 8 }}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleHelp}>
        <Text style={{ color: '#D3D3D3', fontSize: 14 }}>Help</Text>
      </TouchableOpacity>
    </View>
  );
} 
