import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';
import { signIn } from '../services/authService';
import { useAuthDispatch } from '../contexts/authContext';
import FormInput from '../components/FormInput/FormInput';
import FormButton from '../components/FormButton/FormButton';

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
    <View style={styles.container}>
      <Image
        resizeMode="stretch"
        style={{ position: 'absolute', width: '100%', top: 0 }}
        source={require('../assets/images/topwave.png')}
      />
      <SafeAreaView>
        <View style={{ marginTop: 48 }}>
          <Card>
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
              loading={signInLoading}
              disabled={signInLoading}
              type="outline"
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
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default SignInScreen;
