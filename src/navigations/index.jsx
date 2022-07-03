import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'native-base';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { isIphoneX } from '../helpers';
import { Success } from './../screens';
import DrawerNav from './drawer';
import AuthStack from './auth-stack';

const Stack = createNativeStackNavigator();

const index = ({isLoggedIn}) => {
  const insets = useSafeAreaInsets();

  if(!isLoggedIn){
    return (
      <AuthStack />
    )
  }

  return (
    <View style={{ flex: 1, top: isIphoneX ? insets.top : 0 }}>

      <Stack.Navigator initialRouteName="DrawerNav" headerMode="screen">
        <Stack.Screen
          name="DrawerNav"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

function mapStateToProps({ user: { logged_in } }) {
  return {
    isLoggedIn: logged_in,
  };
}
export default connect(mapStateToProps)(index);