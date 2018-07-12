import { createStore as reduxCreateStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import clientMiddleware from 'utils/clientMiddleware';
import ApiClient from 'utils/ApiClient';
import appReducer, { rootReducer } from '../modules/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStore = client =>
  reduxCreateStore(
    rootReducer(combineReducers(appReducer)),
    composeEnhancers(applyMiddleware(clientMiddleware(client), thunk))
  );

const store = createStore(new ApiClient());

store.asyncReducers = {};

function replaceReducers(defaultReducers) {
  const merged = Object.assign({}, defaultReducers, store.asyncReducers);
  const combined = rootReducer(combineReducers(merged));
  store.replaceReducer(combined);
}

export function injectAsyncReducers(asyncReducers) {
  const injectReducers = Object.keys(asyncReducers).reduce((toAdd, reducer) => {
    if (store.asyncReducers[reducer]) {
      delete toAdd[reducer];
    }

    return toAdd;
  }, asyncReducers);

  store.asyncReducers = Object.assign({}, store.asyncReducers, injectReducers);
  replaceReducers(appReducer);
}

if (module.hot) {
  module.hot.accept('../modules/rootReducer', () => {
    const nextReducer = require('../modules/rootReducer').default; // eslint-disable-line global-require

    store.replaceReducer(nextReducer);
  });
}

export default store;
