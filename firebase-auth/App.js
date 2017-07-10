import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUp from './components/Signup';
import Verify from './components/Verify';
import { firebaseConfig } from './firebaseConfig';

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
});

class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUp />
        <Verify />
      </View>
    );
  }
}

export default App;
