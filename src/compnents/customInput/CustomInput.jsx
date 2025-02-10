import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, type}) => {
  return (
    <View style={[styles.container, styles[`container_${type}`]]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={[styles.input, styles[`input_${type}`]]}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderColor: 'e8e8e8',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  container_FANCY: {
    borderRadius: 10,
    justifyContent: 'center',
    width: '70%',
  },
  input_FANCY: {
    height: 60,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
});

export default CustomInput;
