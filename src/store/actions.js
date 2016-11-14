import { 
  ADD_TRINKET,
  UPDATE_TRINKET,
  REMOVE_TRINKET,
} from './constants';

export function addTrinket({ shorthand, str }) {
  return { type: ADD_TRINKET, shorthand, str };
}

export function updateTrinket({ index, shorthand, str }) {
  return { type: UPDATE_TRINKET, index, shorthand, str };
}
 
export function removeTrinket({ index }) {
  return { type: REMOVE_TRINKET, index };
}

