import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms';

const ActionButton = ({ title, caption, onPress }) => {
  return (
    <View style={{ width: '100%', marginTop: 1 }}>
      <Text style={{ fontSize: 15, alignSelf: 'center' }}> {caption}</Text>
      <Button text={title} onPress={onPress} />
    </View>
  )
}

export default ActionButton;
