import React, { Component } from 'react';
import WebView from 'react-native-webview';
import { AuthContext } from '../../provider/AuthProvider';

class NewsRead extends Component {
  state = { loading: false }
  static contextType = AuthContext;

  render() {
    return (
      <WebView
        startInLoadingState={true}
        source={{ uri: 'https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md' }}
      />
    );
  }
}

export default NewsRead;