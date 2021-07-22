import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../Main';
import Turniej from '../screens/Turniej';
import Team from '../screens/Team';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PlayerCard from '../screens/PlayerCard';
import ListaRund from '../ListaRund';
import LoginScreen from '../screens/LoginScreen';


const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#1a112b'},
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="PlayerCard" component={PlayerCard} />
      <Stack.Screen name="ListaRund" component={ListaRund} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#0e072b'},
        headerTintColor: 'white',
        headerBackTitle: 'Back',
        justifyContent: 'center',
      }}>
      
      
      <Stack.Screen name="Turnieje" component={Turniej} />
    
      
    </Stack.Navigator>
  );
};

const TeamStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#0e072b'},
        headerTintColor: 'white',
        headerBackTitle: 'Back',
        justifyContent: 'center',
      }}>
      
      
      <Stack.Screen name="Team" component={Team} />
    
      
    </Stack.Navigator>
  );
};

export {AuthStackNavigator, MainStackNavigator, TeamStackNavigator};
