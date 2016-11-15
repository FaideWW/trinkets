import { OrderedMap } from 'immutable';
import { 
  ADD_TRINKET, 
  UPDATE_TRINKET,
  REMOVE_TRINKET,
} from './constants';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = OrderedMap();

export default function trinketsReducer(state = initialState, action) {
  // debugger;
  switch (action.type) {
    case ADD_TRINKET:
      return addTrinket(state, action);
    case UPDATE_TRINKET:
      return updateTrinket(state, action);
    case REMOVE_TRINKET:
      return removeTrinket(state, action);
    case REHYDRATE:
      return rehydrateState(state, action);
    default:
      return state;
  }
}

function addTrinket(state, { shorthand, str }) {
  let id;
  do {
    id = `${Date.now()}`;
  } while (state.get(id));

  return state.set(id, { shorthand, str, id })
}

function updateTrinket(state, { id, shorthand, str }) {
  return state.set(id, { shorthand, str, id });
}

function removeTrinket(state, { id }) {
  return state.delete(id);
}

function rehydrateState(state, { payload }) {
  return OrderedMap(payload);
}
