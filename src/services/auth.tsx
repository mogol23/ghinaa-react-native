import { deviceInfo } from '../helpers';
import { fidlyApiInstance } from './../utils';
import { response } from './../utils/fidlyApiInstance';

function login(email: String, password: String): Promise<response> {
  return fidlyApiInstance.post('api/auth/login/manager', {
    email,
    password,
    origin: 'application',
  });
}

function controlCollector(identifier: String): Promise<response> {
  const device = deviceInfo();
  return fidlyApiInstance.post('api/collectors/controlcollector', {
    identifier,
    os: device?.os,
    osVersion: device?.osVersion,
    deviceModel: device?.deviceModel,
    deviceToken: device?.deviceToken,
  });
}

function requestResetPasswordLink(email: String): Promise<response> {
  return fidlyApiInstance.post('api/auth/reset-password/send', {
    email,
  });
}

function changePassword(
  newPassword: String,
  oldPassword: String,
): Promise<response> {
  return fidlyApiInstance.put('api/users/me/password', {
    newPassword,
    oldPassword,
  });
}

export default {
  login,
  requestResetPasswordLink,
  changePassword,
  controlCollector,
};
