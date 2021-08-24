import React from 'react';
import FirebaseUserProvider from './src/context/FirebaseUserProvider';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './src/components/navigation/DrawerNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <FirebaseUserProvider>
        <DrawerNavigator />
      </FirebaseUserProvider>
    </NavigationContainer>
  );
};

export default App;
