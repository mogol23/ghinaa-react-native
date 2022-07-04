import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {
  Home,
  ChangePassword,
  UpdateProfile
} from '../screens';
import { AppDrawer } from '../components';
import { connect } from 'react-redux';

const Drawer = createDrawerNavigator();

function drawer({ isLoggedIn }) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      drawerContent={props => <AppDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        options={{
          title: 'Beranda',
        }}
        component={Home}
      />
      <Drawer.Screen
        name="ChangePassword"
        options={{
          title: 'Perbarui Kata Sandi',
        }}
        component={ChangePassword}
      />
      <Drawer.Screen
        name="UpdateProfile"
        options={{
          title: 'Perbarui Profil',
        }}
        component={UpdateProfile}
      />
    </Drawer.Navigator>
  );
}

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}

export default connect(mapStateToProps)(drawer);
