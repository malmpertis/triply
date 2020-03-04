import React from 'react';
import { Text, StyleSheet } from 'react-native';

const GenericTitle = ({ text }) => (
  <Text style={styles.genericText}>{text}</Text>
);

const styles = StyleSheet.create({
  genericText: {
    fontSize: 24,
    color: '#072b4f'
  }
});

export default GenericTitle;
