import {
  ADD_TRINKET,
  UPDATE_TRINKET,
  REMOVE_TRINKET,
} from './constants';

export function addTrinket({ shorthand, str, rangeMin = null, rangeMax = null }) {
  return { type: ADD_TRINKET, shorthand, str };
}

export function updateTrinket({ id, shorthand, str, rangeMin = null, rangeMax = null }) {
  return { type: UPDATE_TRINKET, id, shorthand, str };
}

export function removeTrinket({ id }) {
  return { type: REMOVE_TRINKET, id };
}

