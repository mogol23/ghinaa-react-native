import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../utils';
import { Icon } from 'native-base';


export const ButtonBack = ({ style, text, ...prop }) => {
  const styles = StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      marginTop: 10,
      backgroundColor: colors.default,
      // borderRadius: 6,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginHorizontal: -20,
      paddingBottom: 10
    },
    text: {
      flex:1,
      fontSize: 20,
      paddingLeft: 10,
      color: 'white'
    }
  });

  return (
    <TouchableOpacity {...prop} style={[styles.wrapper, style]}>
      <Icon style={{color:'white'}} name='backburger' type='MaterialCommunityIcons' />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const Button = ({ text, onPress }) => {
  const styles = {
    wrapper: {
      backgroundColor: colors.button.default,
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      marginVertical: 5
    },
    text: {
      color: 'black',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  }
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button;