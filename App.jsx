import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';

const App = () => {
  const [data, setData] = useState(null);

  const handleNotify = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Messages sent successfully!');
      } else {
        alert('Failed to send messages');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while sending messages');
    }
  };

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
      {data ? (
        <Text style={styles.text}>{data.message}</Text>
      ) : (
        <Text>Not able to load Data from Api</Text>
      )}
      <Pressable style={styles.btn} onPress={handleNotify}>
        <Text style={styles.text}>NOTIFY</Text>
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
