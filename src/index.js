import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import routes from './routes';

const reducers = {
  registrationForm: formReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);

let history = createBrowserHistory();

render(<Router routes={routes} history={history} />, document.getElementById('root'));
