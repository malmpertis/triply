import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthState, useAuthDispatch } from '../contexts/authContext';
import { checkAuth } from '../services/authService';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isLoading, isSignout, userToken } = useAuthState();
  const dispatch = useAuthDispatch();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      try {
        user = await checkAuth();
        console.log('user', user);
        dispatch({ type: 'RESTORE_TOKEN', token: user });
      } catch (e) {
        console.log('error', e);
      }
    };

    bootstrapAsync();
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {isLoading && (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          )}
          {!isLoading && userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              isSignout={isSignout}
              name="Auth"
              component={AuthNavigator}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Main" component={MainNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
