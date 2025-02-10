import {
  Text,
  View,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import Body from './Body';

const Homescreen = () => {
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

  const requestLocation = async () => {
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
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <Header />
          <Body location={location} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
    backgroundColor: '#d6e4ea',
  },
});

export default Homescreen;
