import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './../../components';

const ActionButton = ({ title, caption, onPress }) => {
  return (
    <View style={{ width: '100%', marginTop: 20 }}>
      <Text style={{ fontSize: 15, alignSelf: 'center' }}> {caption}</Text>
      <Button text={title} onPress={onPress} />
    </View>
  )
}

export default ActionButton;

