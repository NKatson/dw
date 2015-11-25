import thunk from 'redux-thunk';
import multi from 'redux-multi';
import { fromJS } from 'immutable';
import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import promise from './middleware/promise';
import logger from './middleware/logger';

export default function createStore(initialState) {
  const middleware = [thunk, multi, promise, logger];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducer');

  if (typeof initialState === 'object') {
    initialState.auth = fromJS(initialState.auth);
    initialState.resetPassword = fromJS(initialState.resetPassword);
    initialState.registration = fromJS(initialState.registration);
  }

  const store = finalCreateStore(reducer, initialState);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}
