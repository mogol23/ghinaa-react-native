import React, { Component } from 'react';
import WebView from 'react-native-webview';
import { AuthContext } from '../../provider/AuthProvider';

class NewsRead extends Component {
  state = { loading: false }
  static contextType = AuthContext;

  render() {
    const {news_id} = this.props.route.params;
    return (
      <WebView
        startInLoadingState={true}
        source={{ uri: 'http://180.222.216.66:8080/berita/'+news_id }}
      />
    );
  }
}

export default NewsRead;