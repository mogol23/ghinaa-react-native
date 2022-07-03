import {
  Flex,
  HStack,
  Icon,
  Pressable,
  Stack,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import { GestureResponderEvent } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/EvilIcons';

interface componentProps {
  leftIconName: string;
  amount: string;
  time: string;
  webCode: string;
  onPress: null | ((event: GestureResponderEvent) => void) | undefined;
}

const index: React.FC<componentProps> = ({
  leftIconName,
  amount,
  time,
  webCode,
  onPress,
}) => {
  return (
    <>
      <Pressable
        onPress={onPress}
        w="full"
        alignItems={'center'}
        justifyContent="center">
        <HStack
          space="1"
          width="90%"
          marginY="2"
          safeArea={1}
          borderColor="darkBlue.500"
          borderWidth="1"
          borderRadius="lg"
          shadow="4"
          bg="white">
          <Stack>
            <Icon
              as={SimpleLineIcons}
              name={leftIconName}
              size="lg"
              color="green.500"
            />
          </Stack>
          <HStack flex={1}>
            <VStack>
              <Text fontWeight="bold" textTransform="uppercase">
                {amount}
              </Text>
              <Text fontWeight="bold">{time}</Text>
              <Text fontWeight="bold" fontSize="xs" color="gray.500">
                Code {webCode}
              </Text>
            </VStack>
          </HStack>
          {onPress && (
            <Stack>
              <Icon
                as={EntypoIcons}
                name="chevron-thin-right"
                size="sm"
                color="gray.500"
              />
            </Stack>
          )}
        </HStack>
      </Pressable>
    </>
  );
};

index.defaultProps = {
  leftIconName: 'check',
};

export default index;
