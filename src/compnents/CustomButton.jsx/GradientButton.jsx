import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const GradientButton = ({onPress, text, type = 'PRIMARY'}) => {
  return (
    <LinearGradient
      colors={['#ff5722', '#FAD02B']} // Gradient colors
      style={styles.gradient} // Apply style to the gradient
      start={{x: 0, y: 1}} // Gradient start point (top left)
      end={{x: 1, y: 1}} // Gradient end point (bottom right)
    >
      <Pressable
        onPress={onPress}
        style={[styles.container, styles[`container_${type}`]]}>
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      </Pressable>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    marginVertical: 5,
    borderRadius: 30,
    width: '100%',
  },
  container_PRIMARY: {
    // backgroundColor: '#548294',
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
export default GradientButton;
