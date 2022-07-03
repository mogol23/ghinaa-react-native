import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TransactionHistory, TransactionDetail} from './../screens';

const Stack = createNativeStackNavigator();

const index = () => {
  return (
    <Stack.Navigator
      initialRouteName="TransactionHistory"
      headerMode="screen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
    </Stack.Navigator>
  );
};

export default index;
