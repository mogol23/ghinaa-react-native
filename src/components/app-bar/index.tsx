import {useNavigation} from '@react-navigation/core';
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  HamburgerIcon,
} from 'native-base';
import {ColorType, SizeType} from 'native-base/lib/typescript/components/types';
import React from 'react';
import {viewport} from '../../helpers';

const logo = require('./../../assets/images/logo.png');
const logoWidth = viewport.width / 4;

interface componentProps {
  bgColor: ColorType;
  proLabel: Boolean;
  proLabelBgColor: ColorType;
  proLabelSize: SizeType;
  left: React.ReactChildren;
  showMenu: Boolean;
}

const index: React.FC<componentProps> = ({
  bgColor,
  proLabel,
  proLabelBgColor,
  proLabelSize,
  showMenu,
  ...props
}) => {
  const navigation: any = useNavigation();
  return (
    <HStack
      bgColor={bgColor}
      px="1"
      py="2"
      justifyContent="flex-start"
      alignItems="center"
      shadow="3">
      {showMenu && (
        <IconButton
          alignSelf="flex-start"
          icon={<HamburgerIcon size="lg" color="darkBlue.500" />}
          onPress={() => {
            if (
              'toggleDrawer' in navigation ||
              'closeDrawer' in navigation ||
              'openDrawer' in navigation
            ) {
              return navigation.toggleDrawer();
            }
          }}
        />
      )}
      <Center flex="1">
        <HStack space={1} alignItems="center" justifyItems="center">
          <Image
            source={logo}
            alt="logo"
            size="sm"
            resizeMode="contain"
            width={logoWidth}
          />
          {proLabel && (
            <Box
              bg={proLabelBgColor}
              px="2"
              borderRadius={proLabelSize}
              _text={{
                fontSize: 'xs',
                fontWeight: 'medium',
                color: 'white',
                letterSpacing: 'lg',
              }}>
              PRO
            </Box>
          )}
        </HStack>
      </Center>
      <Stack position="absolute" right="1">
        {props.left}
      </Stack>
    </HStack>
  );
};

index.defaultProps = {
  bgColor: 'white',
  proLabel: true,
  proLabelBgColor: 'tertiary.600',
  proLabelSize: 'lg',
  showMenu: true,
};

export default index;
