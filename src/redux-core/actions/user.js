import {userActionsTypes} from '../types';
import socketClient from 'root/api/socket-core';

const {
  LOADING_USER,
  LOG_IN,
  LOG_OUT,
} = userActionsTypes;

export function onLoadingUser(payload) {
  return {
    type: LOADING_USER,
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
  socketClient.socket.close();

  return {
    type: LOG_OUT,
  }
}