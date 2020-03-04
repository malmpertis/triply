import React from 'react';
import Amplify from 'aws-amplify';
import { ThemeProvider } from 'react-native-elements';
import { AuthProvider } from './src/contexts/authContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/layouts/theme';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
