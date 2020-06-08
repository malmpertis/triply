import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const FormButton = ({ style, theme, ...props }) => (
  <Button buttonStyle={{ ...styles.formButton, ...style }} {...props} />
);

const styles = StyleSheet.create({
  formButton: {
    marginHorizontal: 8,
    marginVertical: 16,
    padding: 8,
    height: 40,
    borderWidth: 1,
    borderRadius: 12
  }
});

export default FormButton;
