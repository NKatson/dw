import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { fromJS } from 'immutable';
import createHistory from 'history/lib/createBrowserHistory';

import createStore from './redux/create';
import getRoutes from './routes';

let initialState = {};

if (localStorage.state_survey && localStorage.state_form) {
  initialState.form = JSON.parse(localStorage.state_form);
  initialState.survey = fromJS(JSON.parse(localStorage.state_survey));
  // delete localStorage.state_survey;
  // delete localStorage.state_form;
}

const history = createHistory();
const store = createStore(initialState);
const root = document.getElementById('root');

const component = (
  <Router routes={getRoutes(store)} history={history} />
);

render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  root
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
}
