import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {createStore, combineReducers, compose} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import {devTools, persistState} from 'redux-devtools';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

import routes from './routes';
import {App} from './containers';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const history = createBrowserHistory();
const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = finalCreateStore(reducer);

render(
  <div>
    <Provider store={store} key="provider">
      <Router routes={routes} history={history}>
        <App />
      </Router>
    </Provider>
    <DebugPanel top right bottom>
     <DevTools store={store} monitor={LogMonitor} />
   </DebugPanel>
  </div>,
  document.getElementById('root')
);
