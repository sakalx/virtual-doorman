import {promise, socketTypes} from '../types';

const {
  FULFILLED,
  PENDING,
  REJECTED,
} = promise;

const {SOCKET_CONNECTION} = socketTypes;

const initState = {
  error: null,
  fetching: false,
  Client: null,
};

export default function (state = initState, {type, payload}) {
  switch (type) {

    case SOCKET_CONNECTION + PENDING:
      return ({
        ...state,
        error: null,
        fetching: true,
      });

    case SOCKET_CONNECTION + FULFILLED:
      return ({
        ...state,
        error: null,
        fetching: false,
        Client: payload,
      });

    case SOCKET_CONNECTION + REJECTED:
      return ({
        ...state,
        error: payload,
        fetching: false,
      });
  }
  return state;
}