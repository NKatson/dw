import { createStore as _createStore, compose } from 'redux' ;
import reducer from './reducer';
import { devTools, persistState } from 'redux-devtools';

export default function createStore() {
  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // const { persistState } = require('redux-devtools');
    // const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = _createStore;
  }

  return finalCreateStore(reducer);
}
