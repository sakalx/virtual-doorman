import {notification} from '../types';

import socketClient, {eventName} from 'root/api/socket';

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
  const payload = {
    'accepted_time': String(+new Date()),
  };

  socketClient.emit(eventName.updateNotification, {uid, payload});

  return {
    type: ACCEPT_NOTIFICATION,
    payload: uid,
  }
}

export function resolveNotification(uid) {
  const payload = {
    'resolved_time': String(+new Date()),
  };

  socketClient.emit(eventName.updateNotification, {uid, payload});

  return {
    type: RESOLVE_NOTIFICATION,
  }
}

export function regeneratedNotification(uid) {
  const payload = {
    'accepted_time': null,
  };

  socketClient.emit(eventName.updateNotification, {uid, payload});

  return {
    type: REGENERATE_NOTIFICATION,
  }
}