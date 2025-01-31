import {Text, View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    const response = await fetch('http://10.0.2.2:5000/api/data');

    const jsonData = await response.json();
    setData(jsonData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the App</Text>
      <Text style={styles.text}>{data ? data.message : 'Loading'}</Text>
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
});

export default App;
