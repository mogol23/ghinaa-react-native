import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'native-base';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIphoneX} from '../helpers';
import {Success} from './../screens';
import DrawerNav from './drawer';

const Stack = createNativeStackNavigator();

const index = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, top: isIphoneX ? insets.top : 0}}>
      <Stack.Navigator initialRouteName="DrawerNav" headerMode="screen">
        <Stack.Screen
          name="DrawerNav"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default index;
