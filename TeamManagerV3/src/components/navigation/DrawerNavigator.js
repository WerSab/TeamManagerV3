import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../CustomDrawer';
import {MainStackNavigator} from './StackNavigator';
import {AuthStackNavigator} from './StackNavigator';
import {TeamStackNavigator} from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName="LoginScreen"
      drawerStyle={{color: 'white'}}>
      <Drawer.Screen name="Turnieje" component={MainStackNavigator} />
      <Drawer.Screen name="Team" component={TeamStackNavigator} />
      <Drawer.Screen name="LoginScreen" component={AuthStackNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
