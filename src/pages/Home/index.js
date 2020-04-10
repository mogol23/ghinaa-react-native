import React, { Component } from 'react';
import { Dimensions, Image, Text, View, RefreshControl, ScrollView } from 'react-native';
import { Background, Logo } from '../../assets';
import { AuthContext } from '../../provider/AuthProvider';
import { colors } from '../../utils';
import RecentNews from './RecentNews';

const d = Dimensions.get('window');
const styles = {
  wrapper: {
    page: {
      flex: 1,
      minHeight: d.height - 25,
      backgroundColor: colors.default,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom: '5%'
    },
    background: {
      width: d.width,
      height: d.height,
      position: 'absolute',
    },
    form: {
      width: '70%',
      borderRadius: 10
    },
    logo: {
      marginTop: '30%',
      width: 200, height: 100,
      marginVertical: 10,
      justifyContent: 'flex-end'
    }
  },
  logo: {
    image: {
      width: 200,
      height: 100,
      position: 'absolute'
    },
    text: {
      fontSize: 20,
      fontFamily: 'Khodijah Free',
      textAlign: 'right'
    }
  }
};



export default class Home extends Component {
  state = { refreshing: false }
  static contextType = AuthContext;

  componentDidMount() {
    const { profil, user } = this.context.user;
    const { navigation } = this.props;
    if (profil.length == 0) navigation.navigate('ProfileUpdate', { title: 'Lengkapi Profil' })
    // profil.map(v => {
    //   if (v.role_id != user.role_id && v.profilable == null ) {
    //     navigation.navigate('ProfileUpdate', { title: 'Lengkapi Profil' })
    //   } else if (v.role_id == user.role_id && v.profilable == null ) {
    //     navigation.navigate('ProfileUpdate', { title: 'Lengkapi Profil' })
    //   }
    // })
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1500);
  }


  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
      >
        <View style={styles.wrapper.page}>
          <Image source={Background} style={styles.wrapper.background} />
          <View style={styles.wrapper.logo}>
            <Image style={styles.logo.image} source={Logo} />
            <Text style={styles.logo.text}>Dalwa Bangil</Text>
          </View>
          {!this.state.refreshing &&
            <RecentNews />
          }
        </View>
      </ScrollView>
    );
  }
}