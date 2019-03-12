import {socketTypes} from '../types';
import connectAsync from 'root/api/socket-core';

const {SOCKET_CONNECTION} = socketTypes;

export function connectUser(user = null) {
  return {
    type: SOCKET_CONNECTION,
    payload: connectAsync(user),
  }
}

////  socketClient.socket.close();