import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router';

import createStore from './redux/create';
import routes from './routes';

const store = createStore();
const component = (
  <ReduxRouter routes={routes} />
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
