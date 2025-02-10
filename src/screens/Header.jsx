import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import userProfileLogo from '../../assets/images/user_profile_icon.png';
import CustomInput from '../compnents/customInput';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../compnents/auth/AuthContext';

const Header = () => {
  const [contactNumber, setContactNumber] = useState('');
  const [responseMsg, setResponseMsg] = useState(null);
  const {name} = useAuth();
  console.log(name);

  const onAddContactPressed = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://10.0.2.2:5000/add-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({contact_number: contactNumber}),
      });

      const data = await response.json();

      if (data.response === 'failure') {
        setResponseMsg(data.msg);
      } else if (data.response === 'success') {
        setResponseMsg(data.msg);
      }
    } catch (error) {
      setResponseMsg("'Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <Text style={styles.userName}>
          Hello, <Text style={styles.boldText}>{name}</Text>
        </Text>
        <Image
          source={userProfileLogo}
          style={styles.profileLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomInput
          value={contactNumber}
          setValue={setContactNumber}
          placeholder={'Add contacts'}
          type={'FANCY'}
        />
        <CustomButton text={'+'} onPress={onAddContactPressed} type="FANCY" />
      </View>
      {responseMsg ? (
        <Text
          style={{
            color: '#2d3f46',
            fontWeight: 700,
          }}>
          {responseMsg}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#79A6B9',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 32,
    fontFamily: 'Poppins-Regular',
    color: '#2d3f46',
  },
  boldText: {
    fontWeight: '700',
  },
  profileLogo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default Header;
