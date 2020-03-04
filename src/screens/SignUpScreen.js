import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { signIn, signUp, confirmSignUp } from '../services/authService';
import AuthLayout from '../layouts/AuthLayout';
import { useAuthDispatch } from '../contexts/authContext';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import GenericTitle from '../components/GenericTitle';

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
    <AuthLayout>
      <View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginVertical: 8,
            marginHorizontal: 16
          }}
        >
          <GenericTitle text="Sign up!" />
        </View>
        {!signed && (
          <>
            <FormInput
              placeholder="Email"
              value={email}
              onChangeText={(value) => setEmail(value)}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
            />
            <FormInput
              placeholder="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
              keyboardType="default"
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
            />
            <FormButton
              loading={signUpLoading}
              disabled={signUpLoading}
              type="outline"
              title="SIGN UP"
              onPress={signUpUser}
            />
          </>
        )}
        {signed && (
          <>
            <FormInput
              placeholder="Verification code"
              value={code}
              onChangeText={(value) => setCode(value)}
              keyboardType="default"
              autoCapitalize="none"
            />
            <FormButton
              loading={verifyLoading}
              disabled={verifyLoading}
              type="outline"
              title="Verify"
              onPress={confirm}
            />
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 18,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#CDD2D6' }}>Already a member?</Text>
          <TouchableOpacity
            style={{ marginLeft: 4 }}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text>Sign in!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthLayout>
  );
};

export default SignUpScreen;
