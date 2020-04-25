import React, { Component } from 'react';
import Ghinaa from '../../layouts/Ghinaa';
import { View } from 'react-native';
import { TextInput, Button, ActionButton } from '../../components'
import {Axios} from '../../config';
import { Toast } from 'native-base';

class ForgotPassword extends Component {
  state = { email: '' }

  requestLink() {
    const data = this.state;
    Axios.post('auth/forgotpassword', data)
      .then(res => {
        Toast.show({
          position: 'bottom',
          duration: 3000,
          text: res.data.message
        })
      })
      .catch(err => {
        let x = Object.keys(err.response.data.errors)[0]
        this.setState({ error: err.response.data.errors[x][0] })
        Toast.show({
          text: err.response.data.errors[x][0],
          position: 'bottom',
          duration: 3000
        })
      })
  }

  render() {
    const { navigation } = this.props;
    return (
      <Ghinaa>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput iconName='email' iconType='Entypo' placeholder='Email' autoCapitalize='none' onChangeText={value => { this.setState({ email: value }) }} />
          <Button text='Kata sandi baru' onPress={() => this.requestLink()} />
        </View>
        <ActionButton caption='Selesai mengganti atau ingat kata sandi?' title='Masuk' onPress={() => navigation.navigate('Login')} />
      </Ghinaa>
    );
  }
}

export default ForgotPassword;