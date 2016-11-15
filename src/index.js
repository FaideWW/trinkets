import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import { persistStore } from 'redux-persist-immutable';
import trinketsApp from './store/reducers';
import difference from 'lodash/difference';
import App from './App';
import './index.css';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';

const enhancer = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const store = enhancer(createStore)(trinketsApp);
const persistor = persistStore(store);

let currentState = null;

// For whatever reason, redux-persist does not automatically remove entries correctly.
store.subscribe(() => {
  const previousState = currentState;
  currentState = store.getState();

  const removedKeys = getRemovedKeys(previousState, currentState);
  persistor.purge(removedKeys);

});

window.store = store;
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

function getRemovedKeys(previous, current) {
  if (!previous || !current) {
    return [];
  }

  return difference(Object.keys(previous.toJS()), Object.keys(current.toJS()));
}
