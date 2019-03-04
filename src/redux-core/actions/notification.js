import {notification} from '../types';

const {
  ACCEPT_NOTIFICATION,
  REGENERATE_NOTIFICATION,
  RESOLVE_NOTIFICATION,
  UPDATE_NOTIFICATION,
} = notification;

export function updateNotification(payload) {
  return {
    type: UPDATE_NOTIFICATION,
    payload,
  }
}

export function acceptNotification(id) {
  return {
    type: ACCEPT_NOTIFICATION,
    payload: id,
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