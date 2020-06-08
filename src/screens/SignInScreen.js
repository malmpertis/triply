import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import { signIn } from '../services/authService';
import { useAuthDispatch } from '../contexts/authContext';
import AuthLayout from '../layouts/AuthLayout';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import GenericTitle from '../components/GenericTitle';

const SignInScreen = ({ navigation }) => {
  const dispatch = useAuthDispatch();
  const [signInLoading, setSignInLoading] = useState(false);

  const signInUser = async (values) => {
    const { email, password } = values;
    setSignInLoading(true);
    signIn(email, password)
      .then((r) => {
        dispatch({
          type: 'SIGN_IN',
          token: r.signInUserSession.accessToken.jwtToken
        });
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setSignInLoading(false));
  };

  return (
    <AuthLayout>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginVertical: 8,
          marginHorizontal: 16
        }}
      >
        <GenericTitle text="Sign in!" />
      </View>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => signInUser(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <FormInput
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCompleteType="email"
            />
            <FormInput
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              keyboardType="default"
              textContentType="password"
              autoCapitalize="none"
              autoCompleteType="password"
            />
            <FormButton
              loading={signInLoading}
              disabled={signInLoading}
              type="outline"
              title="SIGN IN"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 18,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#CDD2D6' }}>Not registered?</Text>
        <TouchableOpacity
          style={{ marginLeft: 4 }}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text>Sign up!</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default SignInScreen;
