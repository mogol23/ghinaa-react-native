import {
  Button,
  Center,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from 'native-base';
import React, { PureComponent } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dateTime from '../../utils/dateTime';
import { AppBar } from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { navigation, route } = this.props;
    const { success, data } = route.params;

    return (
      <Stack flex="1" bg="white">
        <AppBar
          showMenu={false}
          left={
            <Button
              variant="ghost"
              size="lg"
              onPress={() => navigation.goBack()}>
              Fermer
            </Button>
          }
        />
        <Center
          flex="1"
          _text={{ color: 'gray.900', bold: true, fontSize: 'lg' }}>
          <Heading>{data?.base_amount}</Heading>
          <Heading textTransform="uppercase">{data?.base}</Heading>
          <Text fontSize="md" textTransform="uppercase">
            {data?.quote_amount} {data?.quote && `(${data.quote})`}
          </Text>
          <Text fontWeight="bold" fontSize="md">
            {dateTime(data?.executed_at)}
          </Text>
          <Icon
            as={AntDesign}
            name={success ? 'checkcircleo' : 'closecircleo'}
            size="40"
            m={5}
            color={success ? 'green.500' : 'red.500'}
          />
          <Text fontWeight="bold" fontSize="md">
            {success ? 'Le paiement à bien été effectué' : 'Paiement échoué'}
          </Text>
          <HStack display={data?.code ? 'flex' : 'none'}>
            <Text fontSize="10">Code: </Text>
            <Text fontWeight="bold" fontSize="10">
              {data?.code}
            </Text>
          </HStack>
          <HStack display={data?.base_amount ? 'flex' : 'none'}>
            <Text fontSize="md">Montan du paiement: </Text>
            <Text fontWeight="bold" textTransform="uppercase" fontSize="md">
              {data?.base_amount} {data?.base} ({data?.quote_amount}{' '}
              {data?.quote})
            </Text>
          </HStack>
        </Center>
      </Stack>
    );
  }
}

export default index;
