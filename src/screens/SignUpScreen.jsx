import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../compnents/customInput';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';

const SignUpScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordRepeat, setUserPasswordRepeat] = useState('');
  const [fieldsEmpty, setFieldsEmpty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSignInPressed = () => {
    navigation.navigate('Sign In');
  };
  const onSignUpPressed = async () => {
    setIsLoading(true);
    const response = await fetch('http://10.0.2.2:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `userName=${userName}&userPassword=${userPassword}`,
    });

    const data = await response.json();
    if (data.response === 'success') {
      navigation.navigate('Sign In');
      setIsLoading(false);
    } else {
      setFieldsEmpty(data.msg);
      setIsLoading(false);
    }
  };
  const onTermsOfUsePressed = () => {
    console.warn('terms of use');
  };
  const onPrivacyPolicyPressed = () => {
    console.warn('privacy policy');
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
      <SafeAreaView>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>
          <CustomInput
            value={userName}
            setValue={setUserName}
            placeholder={'Enter name'}
          />
          <CustomInput
            value={userPassword}
            setValue={setUserPassword}
            placeholder={'Enter password'}
            secureTextEntry
          />

          <CustomInput
            value={userPasswordRepeat}
            setValue={setUserPasswordRepeat}
            placeholder={'Enter password again'}
            secureTextEntry
          />

          {fieldsEmpty ? <Text style={styles.link}>{fieldsEmpty}</Text> : null}

          <CustomButton text="Sign Up" onPress={onSignUpPressed} />

          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text onPress={onTermsOfUsePressed} style={styles.link}>
              terms of use{' '}
            </Text>{' '}
            and
            <Text onPress={onPrivacyPolicyPressed} style={styles.link}>
              {' '}
              privacy policy
            </Text>
          </Text>
          <CustomButton
            text="Have an account? Sign In"
            type="TERTIARY"
            onPress={onSignInPressed}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'coral',
  },
});
export default SignUpScreen;
