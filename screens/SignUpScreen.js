import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signIn, signUp, confirmSignUp } from '../services/authService';
import { useAuthDispatch } from '../contexts/authContext';

const SignUpScreen = ({ navigation }) => {
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signed, setSigned] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [code, setCode] = useState('');

  const signUpUser = () => {
    setSignUpLoading(true);
    signUp(email, password)
      .then((data) => {
        console.log(data);
        setSigned(true);
        setSignUpLoading(false);
      })
      .catch((err) => {
        setSignUpLoading(false);
        console.log(err);
      });
  };

  const confirm = () => {
    setVerifyLoading(true);
    confirmSignUp(email, code)
      .then(() => {
        setVerifyLoading(false);
        signIn(email, password).then(() =>
          dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' })
        );
      })
      .catch((err) => {
        setVerifyLoading(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {!signed && (
          <>
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
              loading={signUpLoading}
              disabled={signUpLoading}
              title="SIGN UP"
              onPress={signUpUser}
            />
          </>
        )}
        {signed && (
          <>
            <TextInput
              placeholder="Verification code"
              value={code}
              onChangeText={(value) => setCode(value)}
              keyboardType="default"
              autoCapitalize="none"
            />
            <Button
              loading={verifyLoading}
              disabled={verifyLoading}
              title="Verify"
              onPress={confirm}
            />
          </>
        )}
        <TouchableOpacity
          style={{
            marginVertical: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text> - Or you can go back to Sign In - </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
});

export default SignUpScreen;
