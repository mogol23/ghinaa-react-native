import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import {AuthContext} from './../../provider/AuthProvider';

const SecurePage  = () => {
  const auth = useContext(AuthContext); 
  return(
    <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
      <Text>App</Text>
      <Text>user = {auth.user.nama}</Text>
    </View>
  )
}

export default SecurePage;