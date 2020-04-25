import React, { Component } from 'react';
import Ghinaa from '../../layouts/Ghinaa';
import { AuthContext } from '../../provider/AuthProvider';
import RecentNews from './RecentNews';

export default class Home extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const { profil, user } = this.context.user;
    const { navigation } = this.props;
    if( user.role_id != 1) {
      if (profil.length == 0) navigation.navigate('ProfileUpdate', { title: 'Lengkapi Profil' })
    }
  }

  render() {
    return (
      <Ghinaa>
        <RecentNews />
      </Ghinaa>
    );
  }
}