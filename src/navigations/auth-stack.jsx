import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Login, ForgotPassword} from './../screens';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default index;
