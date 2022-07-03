import { reduxAction } from './../../constans';
import { store } from '../index';

const {
  TRANSFER_FETCH_START,
  TRANSFER_FETCH_END,
  TRANSFER_SET_STATE,
  TRANSFER_RESET_STATE,
} = reduxAction;

export function fetchStart() {
  return store.dispatch({
    type: TRANSFER_FETCH_START,
  });
}

export function fetchEnd() {
  return store.dispatch({
    type: TRANSFER_FETCH_END,
  });
}

export function getState() {
  return store.getState().user;
}

export function setState(data) {
  return store.dispatch({
    type: TRANSFER_SET_STATE,
    data,
  });
}

export function resetState() {
  return store.dispatch({
    type: TRANSFER_RESET_STATE,
  });
}

export default {
  fetchStart,
  fetchEnd,
  setState,
  resetState,
  getState,
};
