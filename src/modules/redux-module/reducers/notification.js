import {notification} from '../types';

const {
  ACCEPT_NOTIFICATION,
  REGENERATE_NOTIFICATION,
  RESOLVE_NOTIFICATION,
  SET_NOTIFICATION,
} = notification;

const initState = {
  data: {},
  selected: null,
};

export default function (state = initState, {type, payload}) {

  switch (type) {
    case SET_NOTIFICATION:
      return ({
        ...state,
        data: {
          ...state.data,
          ...payload,
        }
      });

    case ACCEPT_NOTIFICATION:
      return ({
        ...state,
        selected: payload,
      });

    case RESOLVE_NOTIFICATION:
    case REGENERATE_NOTIFICATION:
      return ({
        ...state,
        selected: null,
      });
  }

  return state;
}