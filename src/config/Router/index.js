import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Login, Register, Splash, Home, Profile } from './../../pages';
import { AuthContext } from './../../provider/AuthProvider';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'native-base';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='Login' headerMode='none'>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}

const AppTab = () => {
  return (
    <Tab.Navigator initialRouteName='Home' backBehavior='none' inactiveColor='#d8d8d8' activeColor='white'
      barStyle={{ backgroundColor: '#28ca8f', borderTopColor: '#fede11' }} shifting={true} sceneAnimationEnabled={true}
    >
      <Tab.Screen name='Home' component={Home} options={
        { 
          tabBarIcon: ({ color }) => (
            <Icon name='home' type='Entypo' style={{ fontSize: 26, color: color }} />
          ),
        } 
      } />
       <Tab.Screen name='Profile' component={Profile} options={
        { 
          tabBarIcon: ({ color }) => (
            <Icon name='md-settings' type='Ionicons' style={{ fontSize: 26, color: color }} />
          ),
        } 
      } />
    </Tab.Navigator>
  );
}

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName='AppTab'>
      <Stack.Screen name='AppTab' component={AppTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const DefaultStack = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' headerMode='none'>
      <Stack.Screen name='Splash' component={Splash} />
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