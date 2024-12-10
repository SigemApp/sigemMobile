// src/components/CardButton.tsx
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type CardButtonProps = {
  screen: string;
  iconName: string;
  text: string;
  iconColor?: string;
};

const CardButton: React.FC<CardButtonProps> = ({ screen, iconName, text, iconColor = "white" }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <TouchableOpacity 
      style={{ backgroundColor: '#D3D3D3', borderRadius: 10, padding: 10, margin: 25, alignItems: 'center', width: 130, marginBottom: 70 }}
      onPress={() => navigation.navigate(screen)}
    >
      <Icon name={iconName} size={50} color={iconColor} />
      <Text style={{ color: 'black', marginTop: 10, textAlign: 'center' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CardButton;
