import {socketTypes} from '../types';

const {
  CONNECTING_TO_SERVER,
  CONNECTION_REJECTED,
  SERVER_CONNECTED,
  SERVER_DISCONNECTED,
} = socketTypes;

const initState = {
  Client: null,
  error: null,
  fetching: false,
};

export default function (state = initState, {type, payload}) {
  switch (type) {

    case CONNECTING_TO_SERVER:
      return ({
        ...state,
        Client: payload,
        fetching: true,
      });

    case CONNECTION_REJECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });

    case SERVER_CONNECTED:
      return ({
        ...state,
        error: null,
        fetching: false,
      });

    case SERVER_DISCONNECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });
  }

  return state;
}