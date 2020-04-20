import { Input, Item, Label, Toast, View } from 'native-base';
import React, { Component } from 'react';
import { Button } from '../../components';
import { Axios } from '../../config';


const styles = {
  wrapper: {
    component: {
      flex: 1,
      padding: 10
    },
    item: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginVertical: 5,
      paddingHorizontal: 10
    }
  }
}

const TextInput = ({ label, ...props }) => {
  return (
    <Item stackedLabel style={styles.wrapper.item}>
      <Label>{label}</Label>
      <Input {...props} />
    </Item>
  )
}

export default class ChangePassword extends Component {
  state = { password_lama: '', password: '', password_confirmation: '' }

  send = () => {
    const data = {
      password_lama: this.state.password_lama,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    Axios.put('auth/changepassword', data)
      .then(() => {
        Toast.show({
          text: 'Berhasil diganti',
          duration: 3000,
        })
      })
      .catch(err => {
        const y = err.response.data.errors;
        const x = Object.keys(y)[0];
        Toast.show({
          text: err.response.data.errors[x][0],
          duration: 3000,
        });
      })
  }

  render() {
    return (
      <View style={styles.wrapper.component}>
        <TextInput label="Kata sandi lama"  autoCapitalize='none' secureTextEntry={true} onChangeText={value => this.setState({ password_lama: value })} />
        <TextInput label="Kata sandi"  autoCapitalize='none' secureTextEntry={true} onChangeText={value => this.setState({ password: value })} />
        <TextInput label="Ulangi kata sandi"  autoCapitalize='none' secureTextEntry={true} onChangeText={value => this.setState({ password_confirmation: value })} />
        <Button text='Simpan' onPress={() => { this.send() }} />
      </View>
    );
  }
}