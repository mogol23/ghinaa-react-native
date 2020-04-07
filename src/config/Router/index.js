import React, { Component, useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SecurePage, Register, Splash } from './../../pages'
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './../../provider/AuthProvider';
import { Text, View } from 'native-base';
import { Button } from 'react-native';

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' headerMode='none'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="SecurePage" headerMode="none">
      <Stack.Screen name="SecurePage" component={SecurePage} />
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  )
}

const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  )
}

const Router = () => {
  const { loading, setLoading, user, setUser, authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    cekAuth();
    // test();
  }, []);

  const cekAuth = () => {
    AsyncStorage.removeItem('user');
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          userObject = JSON.parse(userString);
          // console.log(userObject);
          setUser(userObject);
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }


  if(loading) {
    return (<DefaultStack />)
  }
  
  return (
    authenticated ? <AppStack /> : <AuthStack />  
  )

}

export default Router;
  // {/* <Button title='cek' onPress={ () => { setUser({nama:'test'}) } } /> */}