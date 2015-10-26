import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';

let history = createBrowserHistory();

render(<Router routes={routes} history={history} />, document.getElementById('root'));
