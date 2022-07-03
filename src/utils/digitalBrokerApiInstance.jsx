import axios from 'axios';
import {toast} from '.';
import {config} from './../constans';
import {store} from './../redux';
import {auth} from './../api';

const baseURL = config.digitalBroker_url;

const AXIOS = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  },
});

AXIOS.interceptors.response.use(
  response => {
    if (response.data?.success == false) {
      toast('error', response.data?.message);
    }

    return response;
  },
  function (error) {
    if (
      error.response.data?.success == false ||
      'error' in error.response.data
    ) {
      toast('error', error.response.data?.message);
    }

    switch (error.response.status) {
      case 401:
        auth.signout();
        break;
      case 403:
        if (error.response.data?.message?.includes('authentication')) {
          auth.signout();
          break;
        }
    }

    // console.error('service', error)
    return Promise.reject(error);
  },
);

AXIOS.interceptors.request.use(request => {
  const {
    user: {collector, token},
  } = store.getState();

  collector && (request.headers['X-API-KEY'] = collector.zbApiKey);
  collector && (request.headers['X-API-SECRET'] = collector.zbApiSecret);

  token && (request.headers.Authorization = `Bearer ${token}`);

  return request;
});

function setApiKey(value) {
  AXIOS.defaults.headers.common['X-API-KEY'] = `${value}`;
}

function setApiSecret(value) {
  AXIOS.defaults.headers.common['X-API-SECRET'] = `${value}`;
}

export {baseURL, AXIOS, setApiKey, setApiSecret};

export default AXIOS;
