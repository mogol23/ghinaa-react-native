import React from 'react';
import { Image, Text, View } from 'react-native';
import { Logo as Img } from './../../../assets';

const styles = {
  wrapper: {
    component: {
      marginTop: '30%',
      width: 200, height: 100,
      marginVertical: 10,
      justifyContent: 'flex-end'
    }
  },
  component: {
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

const Logo = () => {
  return (
    <View style={styles.wrapper.component}>
      <Image style={styles.component.image} source={Img} />
      <Text style={styles.component.text}>Dalwa Bangil</Text>
    </View>
  )
}

export default Logo;