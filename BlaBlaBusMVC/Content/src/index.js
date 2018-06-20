import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from "./reducers";
import api from './middlewares/api';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const enhancer = applyMiddleware(thunk, api, logger);
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
