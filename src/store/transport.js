import { List } from 'immutable';

export function importState(persistedState) {
  return List(persistedState);
}

export function exportState(state) {
  return state.toArray();
}
