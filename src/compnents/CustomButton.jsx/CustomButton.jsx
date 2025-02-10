import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type = 'PRIMARY'}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    width: '100%',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 50,
  },
  container_PRIMARY: {
    backgroundColor: '#548294',
  },
  container_FANCY: {
    width: '25%',
    backgroundColor: '#2d3f46',
    borderRadius: 10,
  },

  text: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
  },
  container_SECONDARY: {
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
  },
  container_OUT: {
    borderRadius: 20,
    borderWidth: 2,
  },
  text_TERTIARY: {
    color: 'gray',
  },
  text_SECONDARY: {
    color: 'gray',
  },
  text_DANGER: {
    color: 'coral',
    fontWeight: '500',
  },
  text_FANCY: {
    fontSize: 20,
  },
  text_OUT: {
    color: 'Black',
    fontSize: 25,
  },
});

export default CustomButton;
