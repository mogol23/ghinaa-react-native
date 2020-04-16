import React, { Component } from 'react';
import Ghinaa from '../../layouts/Ghinaa';
import { AuthContext } from '../../provider/AuthProvider';
import RecentNews from './RecentNews';

export default class Home extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const { profil } = this.context.user;
    const { navigation } = this.props;
    if (profil.length == 0) navigation.navigate('ProfileUpdate', { title: 'Lengkapi Profil' })
  }

  render() {
    return (
      <Ghinaa>
        <RecentNews />
      </Ghinaa>
    );
  }
}