import {notification} from '../types';
import store from '../store';

import eventNames from 'root/api/socket-core/eventNames';

const {
  ACCEPT_NOTIFICATION,
  REGENERATE_NOTIFICATION,
  RESOLVE_NOTIFICATION,
  SET_NOTIFICATION,
} = notification;

export function setNotification(payload) {
  return {
    type: SET_NOTIFICATION,
    payload,
  }
}

export function acceptNotification(uid) {
  const socketClient = store.getState().socket.Client;
  const payload = {
    'accepted_time': String(+new Date()),
  };

  socketClient.emit(eventNames.updateNotification, {uid, payload});

  return {
    type: ACCEPT_NOTIFICATION,
    payload: uid,
  }
}

export function resolveNotification(uid) {
  const socketClient = store.getState().socket.Client;
  const payload = {
    'resolved_time': String(+new Date()),
  };

  socketClient.emit(eventNames.updateNotification, {uid, payload});

  return {
    type: RESOLVE_NOTIFICATION,
  }
}

export function regeneratedNotification(uid) {
  const payload = {
    'accepted_time': null,
  };

  //socketClient.emit(eventName.updateNotification, {uid, payload});

  return {
    type: REGENERATE_NOTIFICATION,
  }
}