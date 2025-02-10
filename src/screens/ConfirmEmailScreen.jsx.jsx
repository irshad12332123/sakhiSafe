import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/images/Logo_1.png';
import CustomInput from '../compnents/customInput';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';

const ConfirmEmailScreen = () => {
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');

  const onConfirmPressed = () => {
    console.warn('Confirmed');
  };
  const onResendCodePressed = () => {
    console.warn('resend succesful');
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Confirm your email</Text>
        <CustomInput value={code} setValue={setCode} placeholder={'Code'} />

        <CustomButton text="Confirm" onPress={onConfirmPressed} />
        <CustomButton
          text="Resend Code"
          onPress={onResendCodePressed}
          type="SECONDARY"
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 50,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    margin: 10,
    color: '#051C60',
    fontSize: 20,
  },
  link: {
    color: 'red',
  },
});
export default ConfirmEmailScreen;
