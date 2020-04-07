import React from 'react';
import { Icon, Input, Item } from 'native-base';

const TextInput = ({ iconName, iconType, placeholder, onChange }) => {
  const styles = {
    item: {
      backgroundColor: 'white',
      borderRadius: 10,
      marginVertical: 5,
      paddingHorizontal: 10
    }
  }
  return (
    <Item last style={styles.item}>
      <Icon active name={iconName} type={iconType} />
      <Input placeholder={placeholder} onChangeText={onChange} />
    </Item>
  )
}

export default TextInput;