import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Router } from './config';
import AuthProvider from './provider/AuthProvider';
import { Root } from 'native-base';

export default class App extends Component {
  render() {
    return (
      <Root>
        <NavigationContainer>
          <AuthProvider>
            <Router/>
          </AuthProvider>
        </NavigationContainer>
      </Root>
    );
  }
}