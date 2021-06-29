import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { store, persistor } from './src/store';
import Navigation from './src/components/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
