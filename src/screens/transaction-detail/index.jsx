import {Button, Center, Heading, HStack, Icon, Stack, Text} from 'native-base';
import React, {PureComponent} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dateTime from '../../utils/dateTime';
import {AppBar} from './../../components';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation, route} = this.props;
    const {data} = route.params;

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
          _text={{color: 'gray.900', bold: true, fontSize: 'lg'}}>
          <Heading>{data?.offer.base_amount}</Heading>
          <Heading textTransform="uppercase">{data?.offer.base}</Heading>
          <Text fontSize="md" textTransform="uppercase">
            {data?.offer.quote_amount} ({data?.offer.quote})
          </Text>
          <Text fontWeight="bold" fontSize="md">
            {dateTime(data?.createdAt)}
          </Text>
          <Icon
            as={AntDesign}
            name="checkcircleo"
            size="40"
            m={5}
            color="green.500"
          />
          <Text fontWeight="bold" fontSize="md">
            {'Le paiement à bien été effectué'}
          </Text>
          <HStack>
            <Text fontSize="10">Code: </Text>
            <Text fontWeight="bold" fontSize="10">
              {data.code}
            </Text>
          </HStack>
          <HStack>
            <Text fontSize="md">Montan du paiement: </Text>
            <Text fontWeight="bold" textTransform="uppercase" fontSize="md">
              {data?.offer.base_amount} {data?.offer.base} (
              {data?.offer.quote_amount} {data?.offer.quote})
            </Text>
          </HStack>
        </Center>
      </Stack>
    );
  }
}

export default index;
