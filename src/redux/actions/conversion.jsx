import {reduxAction} from './../../constans';
import {store} from '../index';

const {
  CONVERSION_FETCH_START,
  CONVERSION_FETCH_END,
  CONVERSION_SET_STATE,
  CONVERSION_RESET_STATE,
} = reduxAction;

export function fetchStart() {
  return store.dispatch({
    type: CONVERSION_FETCH_START,
  });
}

export function fetchEnd() {
  return store.dispatch({
    type: CONVERSION_FETCH_END,
  });
}

export function getState() {
  return store.getState().user;
}

export function setState(data) {
  return store.dispatch({
    type: CONVERSION_SET_STATE,
    data,
  });
}

export function resetState() {
  return store.dispatch({
    type: CONVERSION_RESET_STATE,
  });
}

export default {
  fetchStart,
  fetchEnd,
  setState,
  resetState,
  getState,
};
