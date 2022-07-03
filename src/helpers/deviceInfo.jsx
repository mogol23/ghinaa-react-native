import {Platform} from 'react-native';
import {
  getBrand,
  getDeviceId,
  getSystemName,
  getSystemVersion,
  getUniqueId,
} from 'react-native-device-info';

function getDeviceInfo() {
  return Platform.select({
    ios: {
      os: getSystemName(),
      osVersion: getSystemVersion(),
      deviceModel: `${getBrand()} ${getDeviceId()}`,
      deviceToken: getUniqueId(),
    },
    android: {
      os: getSystemName(),
      osVersion: getSystemVersion(),
      deviceModel: `${getBrand()} ${getSystemName()}`,
      deviceToken: getUniqueId(),
    },
  });
}

export default getDeviceInfo;
