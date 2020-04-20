import { Icon, Item, Picker } from 'native-base';
import React from 'react';


const styles = {
  wrapper: {
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  }
}

const Dropdown = ({ iconName, iconType, selectedValue, onValueChange, list, placeholder }) => {
  return (
    <Item last style={styles.wrapper}>
      <Picker
        selectedValue={selectedValue}
        style={{ flex: 1 }}
        onValueChange={onValueChange}
        placeholder={placeholder}
      >
        <Picker.Item label={placeholder} />
        {
          Object.keys(list).map((key) => {
            return (<Picker.Item label={list[key]} value={key} key={key} />)
          })
        }
      </Picker>
      <Icon name={iconName} type={iconType} />
    </Item>
  );
}

export default Dropdown;