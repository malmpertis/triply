import React from 'react';
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
