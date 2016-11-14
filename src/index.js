import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import trinketsApp from './store/reducers';
import App from './App';
import './index.css';
import '../node_modules/@blueprintjs/core/dist/blueprint.css';

const store = createStore(trinketsApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
