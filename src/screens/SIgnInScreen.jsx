import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import CustomInput from '../compnents/customInput';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/images/Logo_1.png';
import {useAuth} from '../compnents/auth/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../compnents/CustomButton.jsx/GradientButton';

const SIgnInScreen = ({navigation}) => {
  const [responseMsg, setResponseMsg] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const {logIn, setName} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPressed = () => {
    navigation.navigate('Sign Up');
  };

  const onSignInPressed = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
      setName(data['user_name']);
      // console.log(data['user_name']);
    } else {
      setIsLoading(false);
      setResponseMsg(data.msg);
    }
  };
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      {/* <Image source={Logo} style={styles.logo} resizeMode="contain" /> */}
      <LinearGradient
        colors={['#ff5722', '#FAD02B']} // Gradient colors
        style={styles.gradient} // Apply style to the gradient
        start={{x: 0, y: 0}} // Gradient start point (top left)
        end={{x: 0, y: 1}} // Gradient end point (bottom right)
      >
        <View
          style={{
            minHeight: 300,
            width: '100%',
            flex: 1,
            padding: '40',
            justifyContent: 'flex-end',
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 30,
              color: '#cc451b',
              fontWeight: '900',
            }}>
            Sign In
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '900',
              color: '#d15731',
            }}>
            We care for your safety
          </Text>
        </View>
      </LinearGradient>
      <SafeAreaView style={styles.root}>
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
        <GradientButton onPress={onSignInPressed} text={'Sign In'} />
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
    minHeight: '100%',
    alignItems: 'center',
    padding: 40,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    boxShadow: '0 0 50 50 rgb(255, 234, 148)',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    maxWidth: 400,
    maxHeight: 300,
  },
});

export default SIgnInScreen;
