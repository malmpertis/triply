import React, { useState } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { signIn } from '../services/authService';
import { useAuthDispatch } from '../contexts/authContext';

const SignInScreen = ({ navigation }) => {
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInLoading, setSignInLoading] = useState(false);

  const signInUser = async () => {
    setSignInLoading(true);
    try {
      await signIn(email, password);
      dispatch({ type: 'SIGN_IN', token: '123' });
    } catch (e) {
      console.log(e);
      setSignInLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        keyboardType="default"
        textContentType="password"
        autoCapitalize="none"
        autoCompleteType="password"
      />
      <Button
        loading={signInLoading}
        disabled={signInLoading}
        title="SIGN IN"
        onPress={signInUser}
      />
      <TouchableOpacity
        style={{
          marginVertical: 18,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text> - Or you can Sign Up - </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
