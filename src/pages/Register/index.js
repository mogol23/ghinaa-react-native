import { Toast } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Background } from '../../assets';
import { Button, Dropdown, TextInput, Logo } from '../../components';
import { colors } from '../../utils';
import { Axios } from './../../config';
import ActionButton from './ActionButton';

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
    form: {
      width: '70%',
    },
  }
}

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      role: {},
      role_selected: null,
      nama_lengkap: null,
      no_telp: null,
      email: null,
      password: null,
      password_confirmation: null,
    }
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.getRole();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  sumbit_form = () => {
    const data = {
      nama_lengkap: this.state.nama_lengkap,
      no_telp: this.state.no_telp,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      role_id: this.state.role_selected,
    }

    Axios.post('auth/register', data)
      .then(() => {
        Toast.show({
          text: "Pendaftaran sukses",
          position: 'bottom',
          duration: 3000,
        })
      })
      .then(() => {
        this.props.navigation.replace('Login');
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

  getRole = () => {
    Axios.get('ref/register/role')
      .then(res => {
        const data = res.data;
        this.setState({ role: data })
      })
      .catch(err => {
        console.log(err)
        Toast.show({
          position: 'bottom',
          type: 'danger',
          duration: 3000,
          text: 'Tidak dapat mengambil data dari server'
        })
      })
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.wrapper.page}>
          <Image source={Background} style={styles.wrapper.background} />
          <Logo />
          <View style={styles.wrapper.form}>
            {/* <Text>{ this.state.form.nama_lengkap} </Text> */}
            <TextInput iconName='user' iconType='Entypo' placeholder='Nama lengkap' onChangeText={value => { this.setState({ nama_lengkap: value }) }} />
            <TextInput iconName='phone' iconType='Entypo' placeholder='No telp' onChangeText={value => { this.setState({ no_telp: value }) }} />
            <TextInput iconName='email' iconType='Entypo' placeholder='Email' autoCapitalize='none' onChangeText={value => { this.setState({ email: value }) }} />
            <TextInput iconName='vpn-key' iconType='MaterialIcons' placeholder='Kata sandi' secureTextEntry={true} autoCapitalize='none' onChangeText={value => { this.setState({ password: value }) }} />
            <TextInput iconName='vpn-key' iconType='MaterialIcons' placeholder='Ulangi kata sandi' secureTextEntry={true} autoCapitalize='none' onChangeText={value => { this.setState({ password_confirmation: value }) }} />
            <Dropdown list={this.state.role} iconName='folder' iconType='Entypo' placeholder='Daftar sebagai' onValueChange={value => { this.setState({ role_selected: value }) }} selectedValue={this.state.role_selected} />
            <Button text='Daftar' onPress={() => { this.sumbit_form() }} />
          </View>
          <ActionButton caption='Sudah punya akun?' title='Masuk' onPress={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
    )
  }
}