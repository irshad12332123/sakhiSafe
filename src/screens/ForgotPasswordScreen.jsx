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
import CustomInput from '../compnents/customInput';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';

const ForgotPasswordScreen = ({navigation}) => {
  const [code, setCode] = useState('');
  const [userName, setUserName] = useState('');

  const onSendPressed = () => {
    console.warn('Send');
  };
  const onSignInPressed = () => {
    navigation.navigate('Sign In');
  };
  const onResendCodePressed = () => {
    console.warn('resend succesful');
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput
          value={userName}
          setValue={setUserName}
          placeholder={'enter username'}
        />

        <CustomButton text="Send" onPress={onSendPressed} />
        <CustomButton
          text="Back to Sign In"
          type="TERTIARY"
          onPress={onSignInPressed}
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
export default ForgotPasswordScreen;
