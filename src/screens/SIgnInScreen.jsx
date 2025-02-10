import React, {useState} from 'react';
import {
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
} from 'react-native';
import CustomInput from '../compnents/customInput';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/images/Logo_1.png';
import {useAuth} from '../compnents/auth/AuthContext';

const SIgnInScreen = ({navigation}) => {
  const [responseMsg, setResponseMsg] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const {logIn, setName} = useAuth();

  const onSignUpPressed = () => {
    navigation.navigate('Sign Up');
  };

  const onSignInPressed = async () => {
    const response = await fetch('http://10.0.2.2:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `userName=${userName}&userPassword=${userPassword}`,
    });

    const data = await response.json();

    if (data.token) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user_id', data.user_id.toString());
      logIn();
      setName(data['user_name']);
      // console.log(data['user_name']);
    } else {
      setResponseMsg(data.msg);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.root}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <CustomInput
          value={userName}
          setValue={setUserName}
          placeholder="Enter username"
        />
        <CustomInput
          value={userPassword}
          setValue={setUserPassword}
          placeholder="Enter password"
          secureTextEntry
        />
        {responseMsg ? <CustomButton text={responseMsg} type="DANGER" /> : null}
        <CustomButton text="Sign In" onPress={onSignInPressed} />
        <CustomButton
          text="Forgot Password"
          onPress={() => navigation.navigate('Forgot Password')}
          type="DANGER"
        />
        <CustomButton
          text="Don't have an account? Create one"
          type="TERTIARY"
          onPress={onSignUpPressed}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#d6e4ea',
    padding: 50,
  },
  logo: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 300,
  },
});

export default SIgnInScreen;
