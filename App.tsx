import React from 'react';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {UserProvider} from './src/contexts/userContext';
import './global.css';
import AppSreens from './src/screens';

const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  Login: {test?: string} | undefined;
};

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppSreens />
      </UserProvider>
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
