import {Button, Center, FormControl, Input, VStack} from 'native-base';
import React, {PureComponent} from 'react';
import {View} from 'react-native';
import {auth} from '../../api';
import {AppBar} from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        newPassword: '',
        oldPassword: '',
      },
    };
  }

  setData(field) {
    return value => {
      this.setState(state => ({
        ...state,
        formData: {
          ...state.formData,
          [field]: value,
        },
      }));
    };
  }

  onSubmit() {
    const {formData} = this.state;
    auth.changePassword(formData.newPassword, formData.oldPassword);
  }

  componentWillUnmount() {
    this.state = {
      formData: {
        newPassword: '',
        oldPassword: '',
      },
    };
  }

  render() {
    const {formData} = this.state;
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <AppBar />
        <Center>
          <VStack width="90%" mx="3">
            <FormControl>
              <FormControl.Label>Nouveau mot de passe</FormControl.Label>
              <Input
                secureTextEntry
                value={formData.newPassword}
                placeholder=""
                onChangeText={value => this.setData('newPassword')(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Mot de passe actuel</FormControl.Label>
              <Input
                secureTextEntry
                value={formData.oldPassword}
                placeholder=""
                onChangeText={value => this.setData('oldPassword')(value)}
              />
            </FormControl>
            <Button onPress={this.onSubmit.bind(this)}>Envoyer</Button>
          </VStack>
        </Center>
      </View>
    );
  }
}

export default index;
