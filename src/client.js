import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { fromJS, Map } from 'immutable';
import createHistory from 'history/lib/createBrowserHistory';

import createStore from './redux/create';
import getRoutes from './routes';

let initialState = window.__data;

const history = createHistory();
const store = createStore(initialState);
const root = document.getElementById('root');

const component = (
  <Router routes={getRoutes(store)} history={history} />
);

if (__DEVTOOLS__) {
  const DevTools = require('./containers/DevTools');
  render(
    <Provider store={store} key="provider">
      <div>
        {component}
         <DevTools />
      </div>
    </Provider>,
    root
  );
} else {
  render(
    <Provider store={store} key="provider">
      <div>
        {component}
      </div>
    </Provider>,
    root
  );
}
