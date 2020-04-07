import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Login, Register, SecurePage, Splash } from './../../pages';
import { AuthContext } from './../../provider/AuthProvider';
const Stack = createStackNavigator();

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
  const { loading, setLoading, setUser, authenticated, setAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    cekAuth();
  }, []);

  const cekAuth = () => {
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          userObject = JSON.parse(userString);
          setUser(userObject);
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }


  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    authenticated ? <AppStack /> : <AuthStack />
  )

}

export default Router;