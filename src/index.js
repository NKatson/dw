import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

import createStore from './redux/create';
import routes from './routes';
import {App} from './containers';

const history = createBrowserHistory();
const store = createStore();
const root = document.getElementById('root');
const component = (
  <Router routes={routes} history={history}>
      <App />
  </Router>
);

render(
  <div>
    <Provider store={store} key="provider">
      {component}
    </Provider>
  </div>,
  root
);

if (__DEVTOOLS__) {
  render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DebugPanel top right bottom>
           <DevTools store={store} monitor={LogMonitor} />
         </DebugPanel>
      </div>
    </Provider>,
    root
  );
}
