import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { colors } from '../../utils';
import { Logo, TextInput, Button } from './../../components'
import { Background } from '../../assets';


const d = Dimensions.get('window');
const styles = {
  wrapper: {
    page: {
      flex: 1,
      minHeight: d.height - 25,
      backgroundColor: colors.default,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    background: {
      width: d.width,
      height: d.height,
      position: 'absolute',
    },
    content: {
      width: '70%',
      borderRadius: 10
    }
  }
};

export default class Profile extends Component {
  static contextType = AuthContext;
  state = { email: null, password: null };

  render() {
    const { login } = this.context;
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper.page}>
        <Image source={Background} style={styles.wrapper.background} />
        <Logo />
        <View style={{ width: '90%', flex: 1 }}>
          <TextInput iconName='user' iconType='Entypo' placeholder='Nama lengkap' onChange={value => { this.setState({ nama_lengkap: value }) }} />
          <TextInput iconName='phone' iconType='Entypo' placeholder='No telp' onChange={value => { this.setState({ no_telp: value }) }} />
          <TextInput iconName='email' iconType='Entypo' placeholder='Email' onChange={value => { this.setState({ email: value }) }} />
          <TextInput iconName='phone' iconType='Entypo' placeholder='No telp Wali/Ortu' onChange={value => { this.setState({ no_telp: value }) }} />
          <TextInput iconName='phone' iconType='Entypo' placeholder='No telp Pembina' onChange={value => { this.setState({ no_telp: value }) }} />
          <Button text='Simpan' onPress={() => { this.sumbit_form() }} />
        </View>
      </View>
    );
  }
}