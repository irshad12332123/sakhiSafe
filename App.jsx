import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState({latitude: null, longitude: null});

  const getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs location permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const fetchData = async () => {
    // fetching the server with endpoint api/data for testing the server
    const response = await fetch('http://10.0.2.2:5000/api/data');
    const jsonData = await response.json();
    setData(jsonData);
  };

  const requestLocationAndFetchData = async () => {
    const hasLocationPermission = await getPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
        },
        error => Alert.alert('Error', error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      Alert.alert('Permission denied');
    }
    fetchData();
  };

  useEffect(() => {
    requestLocationAndFetchData();
  }, []);

  const handleNotify = async () => {
    try {
      // fetching the server with endpoint notify
      if (location.latitude && location.longitude) {
        const response = await fetch('http://10.0.2.2:5000/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `latitude=${location.latitude}&longitude=${location.longitude}`,
        });
        const data = await response.json();
        if (data.status === 'success') {
          Alert.alert('Message sent successfully!');
        } else {
          Alert.alert('Error sending message');
        }
      } else {
        Alert.alert('Unable to retrieve location');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error occurred while sending messages');
    }
  };

  return (
    <View style={styles.container}>
      {data ? (
        <Text style={styles.text}>{data.message}</Text>
      ) : (
        <Text>Not able to load Data from Api</Text>
      )}
      <Pressable style={styles.btn} onPress={handleNotify}>
        <Text style={styles.text}>SEND LOCATION</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  btn: {
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default App;
