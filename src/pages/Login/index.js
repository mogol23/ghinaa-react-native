import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from '../../components';
import Ghinaa from '../../layouts/Ghinaa';
import { AuthContext } from '../../provider/AuthProvider';
import ActionButton from './ActionButton';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default class Login extends Component {
  state = { email: null, password: null };
  static contextType = AuthContext;

  render() {
    const { login } = this.context;
    const { navigation } = this.props;
    return (
      <Ghinaa>
        <View style={styles.wrapper}>
          <TextInput iconName='email' iconType='Entypo' placeholder='Email' autoCapitalize='none' onChangeText={value => { this.setState({ email: value }) }} />
          <TextInput iconName='vpn-key' iconType='MaterialIcons' placeholder='Kata sandi' autoCapitalize='none' secureTextEntry={true} onChangeText={value => { this.setState({ password: value }) }} />
          <Button text='Masuk' onPress={() => login(this.state.email, this.state.password)} />
        </View>
        <ActionButton caption='Belum punya akun?' title='Daftar' onPress={() => navigation.navigate('Register')} />
      </Ghinaa>
    );
  }
}