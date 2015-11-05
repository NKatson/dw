import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {reduxReactRouter, ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createBrowserHistory';

import createStore from './redux/create';
import getRoutes from './routes';

const store = createStore(reduxReactRouter, getRoutes, createHistory);
const component = (
  <ReduxRouter routes={getRoutes()} />
);

const root = document.getElementById('root');

render(
  <div>
    <Provider store={store} key="provider">
      {component}
    </Provider>
  </div>,
  root
);

if (__DEVTOOLS__) {
  const DevTools = require('./containers/DevTools/DevTools');
  render(
    <Provider store={store} key="provider">
      <div>
        {component}
         <DevTools />
      </div>
    </Provider>,
    root
  );
}
