import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-19dcb.cloudfunctions.net';
const styles = StyleSheet.create({
  signup: {
    marginBottom: 10,
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10
  }
});


class SignUp extends Component {
  
  state = { phone : '' , error : '' }; // ES7 way of defining state

  handleSubmit = async () => { // ES7 way of doing asyc promise API calls
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone : this.state.phone });
      await axios.post(`${ROOT_URL}/reqOneTimePassword`, { phone : this.state.phone });
      this.setState({ error : '' });
    } catch (err) {
      this.setState({ error : 'Error, Something went wrong'});
    }
  }

  render() {
    return (
      <View>
        <View style={styles.signup}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput value={this.state.phone} onChangeText={(phone) => this.setState({ phone })}/>
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}
      </View>
    );
  }
}

export default SignUp;
