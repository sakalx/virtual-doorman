import {socketTypes} from '../types';
import connect from 'root/api/socket-core';

const {
  CONNECTING_TO_SERVER,
  CONNECTION_REJECTED,
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
} = socketTypes;

export function connectingToServer(user = null) {
  return (dispatch, getState) => {
    const socketClient = connect(user);
    const prevSocketClient = getState().socket.Client;

    const _serverConnected = () => dispatch(serverConnected());
    const _rejectedConnection = err => dispatch(rejectedConnection(err));
    const _disconnectedServer = reason => dispatch(disconnectedServer(reason));

    if (prevSocketClient) {
      prevSocketClient.removeListener('connect', _serverConnected);
      prevSocketClient.removeListener('error', _rejectedConnection);
      prevSocketClient.removeListener('connect_error', _rejectedConnection);
      prevSocketClient.removeListener('connect_timeout', _rejectedConnection);
      prevSocketClient.removeListener('disconnect', _disconnectedServer);
    }

    socketClient.on('connect', _serverConnected);
    socketClient.on('error', _rejectedConnection);
    socketClient.on('connect_error', _rejectedConnection);
    socketClient.on('connect_timeout', _rejectedConnection);
    socketClient.on('disconnect', _disconnectedServer);

    return (
      dispatch({
        type: CONNECTING_TO_SERVER,
        payload: socketClient,
      })
    )
  };
}

function rejectedConnection(error) {
  return {
    type: CONNECTION_REJECTED,
    payload: error,
  }
}

function serverConnected() {
  return {
    type: SERVER_CONNECTED,
  }
}

function disconnectedServer(reason) {
  return {
    type: SERVER_DISCONNECTED,
    payload: reason,
  }
}