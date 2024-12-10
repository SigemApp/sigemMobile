import React from 'react';
import { View, Text } from 'react-native';
import CardButton from '../components/cardButton'; 
import { useNavigation } from '@react-navigation/native'; 

const Dashboard: React.FC = () => {
  const navigation = useNavigation(); 
  return (
    <View style={{ flex: 1, backgroundColor: '#070419', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 32, color: 'white', marginBottom: 60 }}>Menu</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <CardButton screen="machineList" iconName="list" text="Gerenciamento de Máquinas" iconColor="#070419"/>
        <CardButton screen="maintenanceList" iconName="time" text="Histórico de Manutenções" iconColor="#070419"/>
        <CardButton screen="orderService" iconName="construct" text="Gerenciamento de Manutenção" iconColor="#070419"/>
        <CardButton screen="stockList" iconName="archive" text="Gerenciamento de Estoque" iconColor="#070419"/>
        <CardButton screen="teamsManager" iconName="people" text="Gerenciamento de Equipes" iconColor="#070419"/>
        
      </View>
    </View>
  );
};

export default Dashboard;
