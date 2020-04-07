import React, { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import {AuthContext} from './../../provider/AuthProvider';

const SecurePage  = () => {
  const {logout, user} = useContext(AuthContext); 
  // console.log(auth.user);
  return(
    <View style={{ justifyContent: 'center', alignItems: 'center', flex:1 }}>
      <Text>App</Text>
      <Text>user = {user.user.nama_lengkap}</Text>
      <Button title='logout' onPress={() => {logout()}} />
    </View>
  )
}

export default SecurePage;