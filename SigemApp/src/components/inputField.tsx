import React from 'react';
import { View, Text, TextInput } from 'react-native';

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  width?: number;
  height?: number;
  style?: object
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  width = 300, // Largura padrão
  height = 50, // Altura padrão
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ color: 'white', marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={{
          width, // Usando a largura passada como prop
          height, // Usando a altura passada como prop
          borderColor: '#ccc',
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          backgroundColor: '#FFFFFF',
          color: '#000', // Cor do texto dentro do input
        }}
      />
    </View>
  );
};

export default InputField;
