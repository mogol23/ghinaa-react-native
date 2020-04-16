import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Ghinaa from '../../layouts/Ghinaa';
import ProfileSection from './ProfileSection';
import SettingSection from './SettingSection';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default class Profile extends Component {
  render() {
    return (
      <Ghinaa>
        <View style={styles.wrapper}>
          <ProfileSection />
          <SettingSection />
        </View>
      </Ghinaa>
    );
  }
}