import {View, Text, Alert, Pressable, ActivityIndicator} from 'react-native';
import {React, useState} from 'react';
import CustomButton from '../compnents/CustomButton.jsx/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../compnents/auth/AuthContext';

const Body = ({location}) => {
  const {logOut} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const onLogOutPressed = async () => {
    logOut();
  };

  const handleNotify = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      // Fetching the server with the endpoint notify
      if (location.latitude && location.longitude) {
        const response = await fetch('http://10.0.2.2:5000/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
          },
          body: `latitude=${location.latitude}&longitude=${location.longitude}`,
        });
        const data = await response.json();
        if (data.response === 'success') {
          setIsLoading(false);
          Alert.alert('Message sent successfully!');
        } else {
          Alert.alert('Error sending message');
          setIsLoading(false);
        }
      } else {
        Alert.alert('Unable to retrieve location');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error occurred while sending messages');
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#79A6B9',
        padding: 20,
        borderRadius: 30,
      }}>
      <View
        style={{
          width: '100%',
          height: 160,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 35,
            color: '#394f58',
          }}>
          Emergency?
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginBottom: 30,
            color: '#48636f',
            fontFamily: 'Poppins-Regular',
          }}>
          Share location now
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Pressable
          style={{
            backgroundColor: 'red',
            borderRadius: 100,
            height: 200,
            width: 200,
            justifyContent: 'center',
            marginBottom: 50,
            alignItems: 'center',
            boxShadow: '0 0 10 10 red',
          }}
          onPress={handleNotify}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            SOS
          </Text>
        </Pressable>
        <CustomButton onPress={onLogOutPressed} type="OUT" text={'Log out'} />
      </View>
    </View>
  );
};

export default Body;
