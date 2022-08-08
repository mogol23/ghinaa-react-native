import { Platform, StatusBar } from 'react-native';
import {isIphoneX}  from 'react-native-iphone-x-helper';

export const StatusBarHeight = Platform.select({
    ios: isIphoneX ? 34 : 20,
    android: StatusBar.currentHeight,
    default: 0
});

export default {
  StatusBarHeight
}
