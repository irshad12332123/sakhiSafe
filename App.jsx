import {Text, View, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  // Add styles here
  container: {
    flex: 1,
    backgroundColor: 'cyan',
  },
});

export default App;
