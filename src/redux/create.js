import { createStore as _createStore, compose, applyMiddleware} from 'redux' ;
import thunk from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';

import reducer from './reducer';

export default function createStore() {
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // const { persistState } = require('redux-devtools');
    // const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(thunk)(_createStore),
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(thunk)(_createStore);
  }

  return finalCreateStore(reducer);
}
