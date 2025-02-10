import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext} from 'react';

// Create the context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const logIn = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{isAuthenticated, isLoading, logIn, logOut, setName, name}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
