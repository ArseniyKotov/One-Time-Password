import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-one-time-password-19dcb.cloudfunctions.net';
const styles = StyleSheet.create({
  verify: {
    marginBottom: 10,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10
  }
});

class Verify extends Component {

  state = { phone: '', code: '', error: '' }; // ES7 way of defining state

  handleSubmit = async () => {
    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
        phone : this.state.phone,
        code : this.state.code,
      });
      firebase.auth().signInWithCustomToken(data.token);
    } catch (err) {
      this.setState({error : 'Could not verify your account'});
    }
  }

  render() {
    return (
      <View>
        <View style={styles.verify}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
        </View>
        <View style={styles.verify}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput value={this.state.code} onChangeText={(code) => this.setState({ code })} />
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
      </View>
    );
  }
}

export default Verify;
