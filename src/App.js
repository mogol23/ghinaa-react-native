import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';
import React, { Component } from 'react';
import { Router } from './config';
import AuthProvider from './provider/AuthProvider';

export default class App extends Component {
  render() {
    return (
      <Root>
        <NavigationContainer>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </NavigationContainer>
      </Root>
    );
  }
}