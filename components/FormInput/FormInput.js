import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const FormInput = ({ style, ...props }) => (
  <Input
    {...props}
    inputContainerStyle={{ ...styles.inputContainerStyle, ...style }}
    containerStyle={{ marginHorizontal: 0, paddingHorizontal: 0 }}
  />
);

export default FormInput;

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderColor: '#D8D8D8',
    marginVertical: 8,
    marginHorizontal: 8,
    padding: 8,
    height: 56,
    borderRadius: 5
  }
});
