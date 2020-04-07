import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../../utils';

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

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button;