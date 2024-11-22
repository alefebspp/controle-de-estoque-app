import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './Home';
import LoginScreen from './Login';

import {useUserContext} from '../contexts/userContext';

export type RootStackParamList = {
  Home: undefined;
  Login: {test?: string} | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppSreens() {
  const {isLoggedIn} = useUserContext();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
