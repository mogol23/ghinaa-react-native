import { Center, Icon } from 'native-base';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/EvilIcons';

export default () => {
  return (
    <Center
      flex="1"
      justifyContent="space-evenly"
      _text={{ color: 'gray.900', bold: true, fontSize: 'lg' }}>
      Scan en cours...
      <Icon as={SimpleLineIcons} name="clock" size="48" color="gray.400" />
    </Center>
  );
};
