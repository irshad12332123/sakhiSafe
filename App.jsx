import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>THis is the App</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  // Add styles here
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    color: '#ffffff',
  },
});

export default App;
