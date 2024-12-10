import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  color?: string; 
  textColor?: string; 
  fontSize?: number; 
  height?: number; 
  width?: number;
  style?:object
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  color = '#007BFF',
  textColor = '#FFFFFF',
  fontSize = 16,
  height = 48,
  width = 200, 
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color, height, width }]} 
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor, fontSize }]}> 
        {title} 
      </Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Button;
