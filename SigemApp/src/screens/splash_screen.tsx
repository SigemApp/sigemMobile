import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type StackParamList = {
  Home: undefined;
  Login: undefined;
};

type NavigationProps = NativeStackNavigationProp<StackParamList, 'Login'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#070419' }}>
      <Image
        source={require('../assets/sigem.png')}
        style={{
          width: 300,
          height: 300,
          marginBottom: 5,
        }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold', marginLeft: 8, paddingHorizontal: 4 }}>
        Bem-Vindo ao SIGeM
      </Text>
      <Text style={{ fontSize: 18, color: 'white', marginTop: 8, paddingHorizontal: 8 }}>
        Sistema de Gerenciamento de Manutenção
      </Text>
    </View>
  );
};

export default SplashScreen;
