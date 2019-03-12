import {socketTypes} from '../types';

const {SOCKET_CONNECTION} = socketTypes;

const initState = {
  Client: null,
};

export default function (state = initState, {type, payload}) {
  switch (type) {
    case SOCKET_CONNECTION:
      return ({
        ...state,
        Client: payload,
      });
  }

  return state;
}