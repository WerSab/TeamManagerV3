import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import CustomDrawer from './CustomDrawer';
import Turniej from '../components/screens/Turniej';
import Team from '../components/screens/Team';
import SplashScreen from '../components/screens/SplashScreen';
import RegisterScreen from '../components/screens/RegisterScreen';
import LoginScreen from '../components/screens/LoginScreen';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawer} 
    initialRouteName="Login" 
    
    drawerStyle={{ color: 'white' }}
    >
      
      <Drawer.Screen name="Home" component={Main} />
      <Drawer.Screen name="Drużyna" component={Team} />
      <Drawer.Screen name="Moje Turnieje" component={Turniej} />
      <Drawer.Screen name="SplashScreen" component={SplashScreen} />
      <Drawer.Screen name="Login" component={LoginScreen} />
      <Drawer.Screen name="Register" component={RegisterScreen} />
      
    </Drawer.Navigator>
  );
};
export default Navigation;
