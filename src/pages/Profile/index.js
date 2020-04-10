import React, { Component } from 'react';
import { Dimensions, Image, View, ScrollView } from 'react-native';
import { Background } from '../../assets';
import { AuthContext } from '../../provider/AuthProvider';
import { colors } from '../../utils';
import { Logo } from './../../components';
import ProfileSection from './ProfileSection';
import SettingSection from './SettingSection';

const d = Dimensions.get('window');
const styles = {
  wrapper: {
    page: {
      flex: 1,
      minHeight: d.height - 25,
      backgroundColor: colors.default,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    background: {
      width: d.width,
      height: d.height,
      position: 'absolute',
    },
    content: {
      width: '70%',
      borderRadius: 10
    }
  }
};

export default class Profile extends Component {
  static contextType = AuthContext;
  state = { email: null, password: null };

  render() {
    const { user } = this.context;
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.wrapper.page}>
          <Image source={Background} style={styles.wrapper.background} />
          <Logo />
          <View style={{ width: '90%', flex: 1, marginTop: 30 }}>
            <ProfileSection />
            <SettingSection />
          </View>
        </View>
      </ScrollView>
    );
  }
}