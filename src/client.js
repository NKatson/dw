import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createHistory from 'history/lib/createBrowserHistory';

import createStore from './redux/create';
import getRoutes from './routes';

const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = createStore(initialState);
const root = document.getElementById('root');

const component = (
  <Router routes={getRoutes()} history={history} />
);

// render(
//   <Provider store={store} key="provider">
//     {component}
//   </Provider>,
//   root
// );
// -------------------
//
//if (__DEVTOOLS__) {
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
//}
