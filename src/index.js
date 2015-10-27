import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {reducer as formReducer} from 'redux-form';

import routes from './routes';
import {App} from './containers';

const reducers = {
  form: formReducer,
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);
const history = createBrowserHistory();

render(
    <Provider store={store} key="provider">
      <Router routes={routes} history={history}>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);
