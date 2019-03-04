import {doorStation} from '../types';

const {
  SET_SELECTED_DOOR_STATION,
} = doorStation;

export function selectDoorStation(name) {
  return {
    type: SET_SELECTED_DOOR_STATION,
    payload: name,
  }
}