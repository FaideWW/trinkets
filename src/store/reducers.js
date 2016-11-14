import { List } from 'immutable';
import { 
  ADD_TRINKET, 
  UPDATE_TRINKET,
  REMOVE_TRINKET,
} from './constants';

const initialState = List();

export default function trinketsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TRINKET:
      return addTrinket(state, action);
    case UPDATE_TRINKET:
      return updateTrinket(state, action);
    case REMOVE_TRINKET:
      return removeTrinket(state, action);
    default:
      return state;
  }
}

function addTrinket(state, { shorthand, str }) {
  return state.push({ shorthand, str })
}

function updateTrinket(state, { index, shorthand, str }) {
  return state.set(index, { shorthand, str });
}

function removeTrinket(state, { index }) {
  return state.delete(index);
}
