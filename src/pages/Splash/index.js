import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Background, Logo } from './../../assets';

const d = Dimensions.get('window');
const styles = {
  wrapper: {
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
const Splash = () => {
  return (
    <View style={styles.wrapper.page}>
      <Image source={Background} style={{ width: d.width, height: d.height, position: 'absolute' }} />
      <View style={styles.wrapper.logo}>
        <Image style={styles.logo.image} source={Logo} />
        <Text style={styles.logo.text}>Dalwa Bangil</Text>
      </View>
    </View>
  )
}

export default Splash;