import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify from 'aws-amplify';
import { AuthProvider } from './contexts/authContext';
import AppNavigator from './navigation/AppNavigator';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

export default function App() {
  return (
    <AuthProvider>
     <AppNavigator />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
