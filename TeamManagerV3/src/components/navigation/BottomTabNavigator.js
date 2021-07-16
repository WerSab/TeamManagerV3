import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {AuthStackNavigator, MainStackNavigator} from './StackNavigator'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
      headerStyle: {backgroundColor: '#1a112b'},
      headerTintColor: 'white',
      headerBackTitle: 'Back',
    }}
    >
      <Tab.Screen name="SplashScreen" component={AuthStackNavigator} />
      <Tab.Screen name="RegisterScreen" component={AuthStackNavigator} />
      <Tab.Screen name="LoginScreen" component={AuthStackNavigator} />
      <Tab.Screen name="Turnieje" component={MainStackNavigator} />
      
    </Tab.Navigator>
  );
}

export default BottomTabNavigator