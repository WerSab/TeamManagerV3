import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Turniej from '../screens/Turniej';
import Team from '../screens/Team';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import PlayerCard from '../screens/PlayerCard';
import RoundList from '../RoundList';
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
      <Stack.Screen
        name="PasswordRecoveryScreen"
        component={PasswordRecoveryScreen}
      />
      <Stack.Screen name="PlayerCard" component={PlayerCard} />
      <Stack.Screen name="RoundList" component={RoundList} />
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
