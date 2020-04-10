import { Card, CardItem, Icon, Left, Right } from 'native-base';
import React, { useContext } from 'react';
import { Text } from 'react-native';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const SettingSection = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  return (
    <Card>
      <CardItem button onPress={() => { navigation.navigate('ProfileUpdate', {title: 'Perbarui Profil'} ) }}>
        <Left>
          <Text>Perbarui Profil</Text>
        </Left>
        <Right>
          <Icon active name="arrow-forward" />
        </Right>
      </CardItem>
      <CardItem button onPress={() => { navigation.navigate('ChangePassword', {title: 'Ganti Kata sandi'} ) }}>
        <Left>
          <Text>Ganti kata sandi</Text>
        </Left>
        <Right>
          <Icon active name="arrow-forward" />
        </Right>
      </CardItem>
      <CardItem button onPress={() => { logout() }}>
        <Left>
          <Text>Keluar</Text>
        </Left>
        <Right>
          <Icon active name="arrow-forward" />
        </Right>
      </CardItem>
    </Card>
  )
}

export default SettingSection;