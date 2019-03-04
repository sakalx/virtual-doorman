import {notification} from '../types';

const {
  ACCEPT_NOTIFICATION,
  REGENERATE_NOTIFICATION,
  RESOLVE_NOTIFICATION,
  SET_NEW_NOTIFICATION,
} = notification;

export function setNewNotification(payload) {
  return {
    type: SET_NEW_NOTIFICATION,
    payload,
  }
}

export function acceptNotification(timestamp) {
  return {
    type: ACCEPT_NOTIFICATION,
    payload: timestamp,
  }
}

export function resolveNotification() {
  return {
    type: RESOLVE_NOTIFICATION,
  }
}

export function regeneratedNotification() {
  return {
    type: REGENERATE_NOTIFICATION,
  }
}