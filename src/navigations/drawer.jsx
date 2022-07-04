import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import {
  Home,
} from '../screens';
import { AppDrawer } from '../components';
import { connect } from 'react-redux';
import transactionStack from './transaction-stack';

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
      {/* <Drawer.Screen
        name="Contact"
        options={{
          title: "Contactez-nous"
        }}
        component={Contact} /> */}
      {/* <Drawer.Screen
        name="ChangePassword"
        options={{
          title: "Changer de mot de passe"
        }}
        component={ChangePassword} /> */}
      {/* {isLoggedIn && (
        <Drawer.Screen
          name="TransactionStack"
          options={{
            title: 'Historique des transactions',
          }}
          component={transactionStack}
        />
      )} */}
    </Drawer.Navigator>
  );
}

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}

export default connect(mapStateToProps)(drawer);
