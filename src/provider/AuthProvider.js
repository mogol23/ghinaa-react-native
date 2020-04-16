import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';
import React, { Component, createContext } from 'react';
import { Axios } from '../config';
export const AuthContext = createContext();

export default class AuthProvider extends Component {
  state = { loading: true, authenticated: false, user: [] }

  setUser = user => {
    this.setState(prevState => ({ user }));
  }

  setLoading = loading => {
    this.setState(prevState => ({ loading }));
  }

  setAuthenticated = authenticated => {
    this.setState(prevState => ({ authenticated }));
  }

  login = async (email, password) => {

    this.setState({ loading: false });
    const credentials = {
      email: email,
      password: password,
      device_name: 'mobile'
    }

    try {
      const res = await Axios.post('auth/login', credentials)
      const response = res.data;
      await this.setState({ user: response });
      AsyncStorage.setItem('user', JSON.stringify(response));
      if (response) this.setState({ loading: false, authenticated: true, });
    } catch (err) {
      const y = err.response.data.errors;
      const x = Object.keys(y)[0];
      this.setState({ loading: false });
      Toast.show({
        text: err.response.data.errors[x][0],
        duration: 3000,
      })
    }


  }

  logout = () => {
    this.setState({ loading: true });
    Axios.defaults.headers['Authorization'] = `Bearer ${this.state.user.token}`;
    Axios.post('auth/logout')
      .then(() => {
        AsyncStorage.removeItem('user');
        this.setState({ authenticated: false, user: {}, loading: false });
        return true;
      })
      .catch(err => {
        console.log(err.response);
        this.setState({ loading: false });
      })
  }

  checkAlive = async () => {
    try {
      const res = await Axios.get('check-alive');
    } catch (error) {
      AsyncStorage.removeItem('user');
      this.setState({ authenticated: false, user: {}, loading: false });
    }
  }

  render() {
    const { children } = this.props;
    const { user, loading, authenticated } = this.state
    const { setUser, setLoading, setAuthenticated, login, logout, checkAlive } = this
    return (
      <AuthContext.Provider value={{
        user, setUser,
        loading, setLoading,
        authenticated, setAuthenticated,
        login, logout, checkAlive
      }}>
        {children}
      </AuthContext.Provider>
    );
  }
}
