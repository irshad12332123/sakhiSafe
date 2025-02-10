import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Navigation from './navigation/Navigation';
import {AuthProvider} from './src/compnents/auth/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
