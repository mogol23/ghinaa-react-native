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
        email: 'fid@fidly.io',
        password: 'fidly123',
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
    auth.login(formData.email, formData.password);
  }

  render() {
    const {formData} = this.state;
    const {navigation} = this.props;
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <AppBar showMenu={false} />
        <Center>
          <VStack width="90%" mx="3">
            <FormControl>
              <FormControl.Label>E-mail</FormControl.Label>
              <Input
                value={formData.email}
                placeholder=""
                onChangeText={value => this.setData('email')(value)}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Mot de passe</FormControl.Label>
              <Input
                secureTextEntry
                value={formData.password}
                placeholder=""
                onChangeText={value => this.setData('password')(value)}
              />
            </FormControl>
            <Button onPress={this.onSubmit.bind(this)}>Se Connecter</Button>
            <Button
              variant="ghost"
              onPress={() => navigation.navigate('ForgotPassword')}>
              Mot de passe oublié?
            </Button>
          </VStack>
        </Center>
      </View>
    );
  }
}

export default index;
