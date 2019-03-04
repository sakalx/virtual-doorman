import {TOGGLE_SNACKBAR} from '../types';

export function toggleSnackbar(message = '') {
  return {
    type: TOGGLE_SNACKBAR,
    payload: message,
  }
}