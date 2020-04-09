import { Icon, Input, Item } from 'native-base';
import React from 'react';

const TextInput = ({ iconName, iconType, ...props }) => {
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
      <Input {...props} />
      <Icon active name={iconName} type={iconType} />
    </Item>
  )
}

export default TextInput;