import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const FormInput = ({ style, ...props }) => (
  <Input
    {...props}
    inputContainerStyle={{ ...styles.inputContainerStyle, ...style }}
    containerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
    inputStyle={{ fontSize: 16 }}
  />
);

export default FormInput;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderColor: '#C2C8CD',
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 8,
    height: 48
  }
});
