import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Background, Logo } from '../../assets';
import { Button, TextInput } from '../../components';
import { AuthContext } from '../../provider/AuthProvider';
import { colors } from '../../utils';
import ActionButton from './ActionButton';

const d = Dimensions.get('window');
const styles = {
  wrapper: {
    page: {
      flex: 1,
      minHeight: d.height - 25,
      backgroundColor: colors.default,
      justifyContent: 'center',
      alignItems: 'center',
    },
    background: {
      width: d.width,
      height: d.height,
      position: 'absolute',
    },
    form: {
      width: '70%',
      borderRadius: 10
    },
    logo: {
      width: 200, height: 100,
      marginVertical: 20,
      justifyContent: 'flex-end'
    }
  },
  logo: {
    image: {
      width: 200,
      height: 100,
      position: 'absolute'
    },
    text: {
      fontSize: 20,
      fontFamily: 'Khodijah Free',
      textAlign: 'right'
    }
  }
}

export default class Login extends Component {
  static contextType = AuthContext;
  state = { email: null, password: null };

  render() {
    const { login } = this.context;
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.wrapper.page}>
          <Image source={Background} style={styles.wrapper.background} />
          <View style={styles.wrapper.logo}>
            <Image style={styles.logo.image} source={Logo} />
            <Text style={styles.logo.text}>Dalwa Bangil</Text>
          </View>
          <View style={styles.wrapper.form}>
            <TextInput iconName='email' iconType='Entypo' placeholder='Email' autoCapitalize='none' onChangeText={value => { this.setState({ email: value }) }} />
            <TextInput iconName='vpn-key' iconType='MaterialIcons' placeholder='Kata sandi' autoCapitalize='none' secureTextEntry={true} onChangeText={value => { this.setState({ password: value }) }} />
            <Button text='Masuk' onPress={() => login(this.state.email, this.state.password)} />
          </View>
          <ActionButton caption='Belum punya akun?' title='Daftar' onPress={() => navigation.navigate('Register')} />
        </View>
      </ScrollView>
    );
  }
}