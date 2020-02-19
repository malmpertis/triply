import React from 'react';
import Amplify from 'aws-amplify';
import { ThemeProvider } from 'react-native-elements';
import { AuthProvider } from './contexts/authContext';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './layouts/theme';

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
