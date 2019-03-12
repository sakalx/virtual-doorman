import {socketTypes} from '../types';
import connect from 'root/api/socket-core';

const {SOCKET_CONNECTION} = socketTypes;

export function connectUser(user = null) {
  return {
    type: SOCKET_CONNECTION,
    payload: connect(user),
  }
}