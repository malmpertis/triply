import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthState, useAuthDispatch } from '../contexts/authContext';
import { checkAuth } from '../services/authService';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isLoading, isSignout, userToken } = useAuthState();
  const dispatch = useAuthDispatch();

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let user;
      try {
        user = await checkAuth();
      } catch (e) {
        console.log('error', e);
      }

      dispatch({ type: 'RESTORE_TOKEN', token: user });
    };

    bootstrapAsync();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading && (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={SplashScreen} />
        )}
        {!isLoading && userToken == null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={SignUpScreen}
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: isSignout ? 'pop' : 'push'
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
