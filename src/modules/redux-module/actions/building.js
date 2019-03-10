import getBuilding from 'root/api/getBuildings';
import {buildings} from '../types';

const {
  GET_BUILDING_DATA,
  SET_SELECTED_BUILDING,
} = buildings;

export function getBuildingData() {
  return {
    type: GET_BUILDING_DATA,
    payload: getBuilding(),
  }
}
export function selectBuilding(id) {
  return {
    type: SET_SELECTED_BUILDING,
    payload: Number(id),
  }
}