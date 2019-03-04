import {notification} from '../types';

const {
  ACCEPT_NOTIFICATION,
  REGENERATE_NOTIFICATION,
  RESOLVE_NOTIFICATION,
  SET_NEW_NOTIFICATION,
} = notification;

const initState = {
  // timestamp as ID
  data: {},
  selected: null,
};

export default function (state = initState, {type, payload}) {

  switch (type) {
    case SET_NEW_NOTIFICATION:
      const {timestamp} = payload;
      return ({
        ...state,
        data: {
          ...state.data,
          [timestamp]: payload,
        }
      });

    case ACCEPT_NOTIFICATION:
      const updatedNotificationByAcceptedTime = {
        ...state.data[payload],
        acceptedCallTime: +new Date(),
      };

      return ({
        ...state,
        data: {
          ...state.data,
          [payload]: updatedNotificationByAcceptedTime,
        },
        selected: payload,
      });

    case RESOLVE_NOTIFICATION:
      const updatedNotificationByResolvedTime = {
        ...state.data[state.selected],
        resolvedCallTime: +new Date(),
      };

      return ({
        ...state,
        data: {
          ...state.data,
          [state.selected]: updatedNotificationByResolvedTime,
        },
        selected: null,
      });

    case REGENERATE_NOTIFICATION:
      const regeneratedNotification = {
        ...state.data[state.selected],
        acceptedCallTime: null,
      };

      return ({
        ...state,
        data: {
          ...state.data,
          [state.selected]: regeneratedNotification,
        },
        selected: null,
      });
  }

  return state;
}