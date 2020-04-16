import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import WebView from 'react-native-webview';
import Ghinaa from '../../layouts/Ghinaa';
import { AuthContext } from '../../provider/AuthProvider';
import { ButtonBack } from './../../components';

const styles = StyleSheet.create({
  back: {
    bottom: -20
  }
});

class NewsRead extends Component {
  state = { loading: false }
  static contextType = AuthContext;

  render() {
    const { news_id } = this.props.route.params;
    const { route, navigation } = this.props
    return (
      <Ghinaa>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {route.params.title} </Text>
        <WebView style={{ backgroundColor: 'transparent' }} overScrollMode='never' bounces={false}
          showsVerticalScrollIndicator={false} containerStyle={{ flex: 1, marginBottom: -30 }}
          source={{ uri: 'http://180.222.216.66:8080/berita/' + news_id }}
        />
        <ButtonBack text='Kembali' onPress={() => { navigation.goBack() }} style={styles.back} />
      </Ghinaa>
    );
  }
}

export default NewsRead;