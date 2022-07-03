import { toast } from '../utils';
import user from '../redux/actions/user';
import { auth as authService } from '../services';
import { setAuthToken } from '../utils/fidlyApiInstance';
import transfer from '../redux/actions/transfer';

async function login(email: String, password: String) {
  try {
    user.fetchStart();
    const response = await authService.login(email, password);
    if (response.data.user) {
      response.data.current = response.data.user;
      delete response.data.user;
    }
    user.setState({
      logged_in: true,
      ...response.data,
    });
  } catch (error) {
  } finally {
    user.fetchEnd();
  }
}

async function qrLogin(identifier: String, token: String) {
  if (!identifier && !token) {
    return toast('error', "une erreur s'est produite, réessayez", undefined);
  }
  try {
    user.fetchStart();
    setAuthToken(token);
    const response = await authService.controlCollector(identifier);
    user.setState({
      logged_in: true,
      token,
      collector: response.data,
    });
  } catch (error) {
  } finally {
    user.fetchEnd();
  }
}

async function resetPassword(email: String) {
  try {
    user.fetchStart();
    const response = await authService.requestResetPasswordLink(email);
    toast('success', response.data, undefined);
  } catch (error) {
  } finally {
    user.fetchEnd();
  }
}

async function changePassword(newPassword: String, oldPassword: String) {
  const token = user.getState()?.token;
  try {
    setAuthToken(token);
    user.fetchStart();
    const response = await authService.changePassword(newPassword, oldPassword);
    if (response.data.user) {
      response.data.current = response.data.user;
      delete response.data.user;
    }
    user.setState({
      ...response.data,
    });
    toast('success', 'Mot de passe mis à jour avec succès', undefined);
  } catch (error) {
  } finally {
    user.fetchEnd();
  }
}

function signout() {
  user.resetState();
  transfer.resetState();
}

export default {
  login,
  resetPassword,
  changePassword,
  qrLogin,
  signout,
};
