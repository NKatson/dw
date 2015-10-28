import { createStore as _createStore, compose, applyMiddleware} from 'redux' ;
import thunk from 'redux-thunk';

export default function createStore() {
  const middleware = [thunk];
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
  const store = finalCreateStore(reducer);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}
