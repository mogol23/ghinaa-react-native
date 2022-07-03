import { FlatList, Icon, IconButton, Input, Stack } from 'native-base';
import React, { PureComponent } from 'react';
import SplashScreen from 'react-native-splash-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { auth as authApi, conversion as conversionApi } from '../../api';
import { isIphoneX, qrcode } from '../../helpers';
import { default as conversionActions } from '../../redux/actions/conversion';
import dateTime from '../../utils/dateTime';
import { AppBar, TransactionListItem } from './../../components';
import Loading from './loading';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      mode: 'camera', // camera || input,
    };
  }

  switchMode() {
    this.setState(state => ({
      mode: state.mode !== 'camera' ? 'camera' : 'input',
    }));
  }

  barcodeRecognized({ data }) {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return this.signin(data);
    }

    if (data) {
      this.handleConversion(data);
    }
  }

  async signin(data) {
    this.setState({ submit: true });
    const decryptedData = qrcode.decryptQrcode(data);
    const extractData = qrcode.extractTokenIdentifier(decryptedData);
    await authApi.qrLogin(extractData.identifier, extractData.token);
    this.setState({ submit: false });
  }

  async handleConversion(code) {
    this.setState({ submit: true });

    if (code.toLocaleLowerCase().includes('demo')) {
      return this.demoConversion(code);
    }

    return this.submitConversion(code);
  }

  async demoConversion(code) {
    this.setState({ submit: true });

    const { navigation } = this.props;
    try {
      const response = await conversionApi.confirmDemoConversion(code);
      navigation.navigate('Success', {
        success: response.success,
        data: response.data,
      });
    } catch (error) {
    } finally {
      this.setState({ submit: false });
    }
  }

  async submitConversion(code) {
    const { navigation } = this.props;
    this.setState({ submit: true });

    try {
      const response = await conversionApi.confirm(code);
      const data = response.data;

      if (data.success === true) {
        conversionApi.removeConversionRequest(code);
      }

      navigation.navigate('Success', {
        success: data.success,
        data: data.data,
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ submit: false });
    }
  }

  componentDidMount() {
    SplashScreen.hide();

    const { navigation } = this.props;
    navigation.addListener('focus', () => {
      conversionActions.resetState();
    });
  }

  render() {
    const { submit, mode } = this.state;
    const { isLoggedIn, conversion } = this.props;
    if (submit) {
      return (
        <Stack flex="1" bg="white">
          <AppBar />
          <Loading />
        </Stack>
      );
    }

    return (
      <Stack flex="1" bg="white">
        <AppBar />
        {mode === 'input' && (
          <>
            <Input
              onChangeText={conversionApi.findConversionRequest.bind(this)}
              placeholder="Entrer le code de transaction"
              borderRadius="4"
              m={'1.5'}
              py="3"
              px="1"
              fontSize="14"
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size="6"
                  color="gray.400"
                  as={<MaterialIcons name="search" />}
                />
              }
            />
            <FlatList
              data={conversion.search_results}
              keyExtractor={item => item._id}
              renderItem={({ item }) => {
                const amount = `${item.base_amount} ${item.base} (${item.quote_amount} ${item.quote})`;
                const time = dateTime(item.createdAt);
                return (
                  <TransactionListItem
                    amount={amount}
                    time={time}
                    webCode={item.code}
                    onPress={() => this.submitConversion(item.code)}
                    refreshing={conversion.fetching}
                  />
                );
              }}
            />
          </>
        )}

        <IconButton
          onPress={() => this.switchMode()}
          display={!isLoggedIn ? 'none' : 'flex'}
          position="absolute"
          bottom={isIphoneX() ? 20 : 5}
          right={5}
          size="md"
          variant="outline"
          colorScheme="light"
          borderColor={mode !== 'camera' ? 'black' : 'white'}
          _icon={{
            name: mode !== 'camera' ? 'qrcode-scan' : 'form-textbox',
            as: MaterialCommunityIcons,
            size: 'sm',
            color: mode !== 'camera' ? 'black' : 'white',
          }}
        />
      </Stack>
    );
  }
}

function mapStateToProps({ user: { logged_in: isLoggedIn }, conversion }) {
  return {
    isLoggedIn,
    conversion,
  };
}

export default connect(mapStateToProps)(index);
