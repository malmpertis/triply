import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthDispatch } from '../contexts/authContext';
import { signOut } from '../services/authService';

const HomeScreen = () => {
  const dispatch = useAuthDispatch();

  const handleSignOut = async () => {
    try {
      await signOut;
      dispatch({ type: 'SIGN_OUT' });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

export default HomeScreen;
