import { Center, Text } from 'native-base';
import React, { PureComponent } from 'react';
import { AppBar } from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <AppBar />
        <Center>
          <Text>Contact us</Text>
        </Center>
      </>
    );
  }
}

export default index;
