import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SIgnInScreen from '../src/screens/SIgnInScreen';
import SignUpScreen from '../src/screens/SignUpScreen';
import Homescreen from '../src/screens/Homescreen';
import {useAuth} from '../src/compnents/auth/AuthContext';

const Navigation = () => {
  const {isAuthenticated, isLoading, logIn} = useAuth(); // use context

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    logIn();
  }, [logIn]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          <Stack.Screen name="HomeScreen" component={Homescreen} />
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SIgnInScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
