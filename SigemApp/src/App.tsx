import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/splash_screen';
import LoginScreen from './screens/login';
import Dashboard from './screens/dashboard';
import MachineList from './screens/machineList';
import MaintenanceForm from './screens/orderService';
import MaintenanceList from './screens/maintenanceList';
import StockManagement from './screens/stockList';
import RegisterScreen from './screens/siginUp';
import ForgotPasswordScreen from './screens/passwordRetriever';
import ProfileScreen from './screens/profileManager';
import TeamManagementScreen from './screens/teamsManager';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D3D3D3',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#070419', 
        },
      })}
    >
      <Tab.Screen name="Gerenciamnetos" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="machineList" component={MachineList} options={{ headerShown: false }} />
        <Stack.Screen name="maintenanceList" component={MaintenanceList} options={{ headerShown: false }} />
        <Stack.Screen name="stockList" component={StockManagement} options={{ headerShown: false }} />
        <Stack.Screen name="teamsManager" component={TeamManagementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="orderService" component={MaintenanceForm} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
