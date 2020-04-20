import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Logo as Img } from './../../../assets';

const styles = StyleSheet.create({
  wrapper: {
    // marginTop: '30%',
    width: 150, height: 90,
    marginVertical: 10,
    justifyContent: 'flex-end'
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'stretch'
  },
  text: {
    fontSize: 17,
    fontFamily: 'Khodijah Free',
    textAlign: 'right'
  }
});

const Logo = ({ style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Image style={styles.image} source={Img} />
      <Text style={styles.text}>Dalwa Bangil</Text>
    </View>
  )
}

export default Logo;