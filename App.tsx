import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/screens/Login';
import DefaultScreen from './src/screens';

import './global.css';

export type RootStackParamList = {
  Home: undefined;
  Login: {test?: string} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={DefaultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
