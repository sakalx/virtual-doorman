import {notification} from '../types';

import socket from 'root/api/getSocket';

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

export function acceptNotification(id) {
  const payload = {
    uid: id,
    column: 'accepted_time',
    value: String(+new Date()),
  };

  socket.emit('update notification', payload);

  return {
    type: ACCEPT_NOTIFICATION,
    payload: id,
  }
}

export function resolveNotification(id) {
  const payload = {
    uid: id,
    column: 'resolved_time',
    value: String(+new Date()),
  };

  socket.emit('update notification', payload);

  return {
    type: RESOLVE_NOTIFICATION,
}
}

export function regeneratedNotification(id) {
  const payload = {
    uid: id,
    column: 'accepted_time',
    value: null,
  };

  socket.emit('update notification', payload);

  return {
    type: REGENERATE_NOTIFICATION,
  }
}