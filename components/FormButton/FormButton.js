import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const FormButton = ({ style, ...props }) => (
  <Button buttonStyle={{ ...styles.formButton, ...style }} {...props} />
);

const styles = StyleSheet.create({
  formButton: {
    marginHorizontal: 8,
    marginVertical: 16,
    padding: 8,
    height: 48,
    borderRadius: 5
  }
});

export default FormButton;
