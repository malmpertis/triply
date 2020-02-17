import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';
import { Formik } from 'formik';
import { signIn } from '../services/authService';
import { useAuthDispatch } from '../contexts/authContext';
import FormInput from '../components/FormInput/FormInput';
import FormButton from '../components/FormButton/FormButton';

const SignInScreen = ({ navigation }) => {
  const dispatch = useAuthDispatch();
  const [signInLoading, setSignInLoading] = useState(false);

  const signInUser = async (values) => {
    const { email, password } = values;
    setSignInLoading(true);
    signIn(email, password)
      .then((r) => {
        console.log(r);
        dispatch({ type: 'SIGN_IN', token: '123' });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        style={{ position: 'absolute', width: '100%', top: 0 }}
        source={require('../assets/images/topwave.png')}
      />
      <SafeAreaView>
        <View style={{ marginTop: 80 }}>
          <Card
            containerStyle={{
              borderRadius: 11,
              marginHorizontal: 30,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,

              elevation: 12
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 16
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 8 }}>
                Welcome to Triply!
              </Text>
              <Text style={{ fontSize: 24 }}>Please Sign In</Text>
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
          </Card>
        </View>
      </SafeAreaView>
      <Image
        resizeMode="stretch"
        style={{ position: 'absolute', width: '100%', bottom: 0 }}
        source={require('../assets/images/bottomwaves.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SignInScreen;
