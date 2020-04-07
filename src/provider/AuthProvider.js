import React, { Component, createContext } from 'react';
import { View, Text, Button } from 'react-native';
import { Axios } from '../config';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
export const AuthContext = createContext();


export default class AuthProvider extends Component {
  state = { loading: true, authenticated: false, user: {} }

  setUser = user => {
    this.setState(prevState => ({ user }));
  }

  setLoading = loading => {
    this.setState(prevState => ({ loading }));
  }

  setAuthenticated = authenticated => {
    this.setState(prevState => ({ authenticated }));
  }

  login = (email, password) => {
    const credentials = {
      email: email,
      password: password,
      device_name: 'mobile'
    }

    // const credentials = {
    //   email: 'achmadfaz@gmail.com',
    //   password: 'Ahmadh2397',
    //   device_name: 'mobile'
    // }

    Axios.post('auth/login', credentials)
      .then(res => {
        const response = res.data;
        AsyncStorage.setItem('user', JSON.stringify(response));
        this.setState({ authenticated: true });
        return true;
      })
      .catch(err => {
          const y = err.response.data.errors;
          const x = Object.keys(y)[0]
          Toast.show({
            text: err.response.data.errors[x][0],
            duration: 3000,
          })
      })
  }

  render() {
    const { children } = this.props;
    const { user, loading, authenticated } = this.state
    const { setUser, setLoading, setAuthenticated, login } = this
    return (
      <AuthContext.Provider value={{
        user, setUser,
        loading, setLoading,
        authenticated, setAuthenticated,
        login
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
}
