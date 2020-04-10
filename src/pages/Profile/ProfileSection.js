import { Card, CardItem, Icon, Text } from 'native-base';
import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const ProfileSection = () => {
  const { user } = useContext(AuthContext);
  return (
    <Card>
      <CardItem>
        <Icon active name='user' type='Entypo' />
        <Text style={{ fontSize: 20 }}>{user.user.nama_lengkap}</Text>
      </CardItem>
      <CardItem>
        <Icon active name='email' type='Entypo' />
        <Text style={{ fontSize: 20 }}>{user.user.email}</Text>
      </CardItem>
      <CardItem>
        <Icon active name='phone' type='Entypo' />
        <Text style={{ fontSize: 20 }}>{user.user.no_telp}</Text>
      </CardItem>
    </Card>
  )
}

export default ProfileSection;