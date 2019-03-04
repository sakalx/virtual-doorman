import {authentication} from '../types';

const {
  LOADING_AUTH,
  LOG_IN,
  LOG_OUT,
} = authentication;

export function onLoadingAuth(payload) {
  return {
    type: LOADING_AUTH,
    payload,
  }
}

export function logInUser(user) {
  return {
    type: LOG_IN,
    payload: user,
  }
}

export function logOutUser() {
  return {
    type: LOG_OUT,
  }
}