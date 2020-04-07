import React, { Component } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Background, Logo } from '../../assets';
import { AuthContext } from '../../provider/AuthProvider';
import { colors } from '../../utils';
import RecentNews from './RecentNews';

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
      borderRadius: 10
    },
    logo: {
      marginTop: 120,
      width: 200, height: 100,
      marginVertical: 10,
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
};

export default class Home extends Component {
  static contextType = AuthContext;
  state = { email: null, password: null };

  render() {
    const { login } = this.context;
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper.page}>
        <Image source={Background} style={styles.wrapper.background} />
        <View style={styles.wrapper.logo}>
          <Image style={styles.logo.image} source={Logo} />
          <Text style={styles.logo.text}>Dalwa Bangil</Text>
        </View>
        <RecentNews />
      </View>
    );
  }
}