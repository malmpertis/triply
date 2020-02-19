import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';

const AuthLayout = ({ children }) => (
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
          {children}
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AuthLayout;
