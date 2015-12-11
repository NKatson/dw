import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import plaid from 'plaid';

import User from './models/User';
import { mainController } from './controllers';
import createStore from '../redux/create';
import config from '../config';
import getRoutes from '../routes';
import Html from '../helpers/Html';

import { setBanks } from '../redux/actions/plaid';

const MongoStore = require('connect-mongo')(session);
import './config/db';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
	store: new MongoStore({url: 'mongodb://localhost/worthfm' , autoReconnect: true })
}));

app.use('/dist', express.static(path.join(__dirname, '../../static/dist')));

// routing middleware
app.use('/state', mainController);

app.get('/config', (req, res) => {
		res.status(200).send({
			host: config.host,
			port: config.port,
			apiHost: config.apiHost,
			apiPort: config.apiPort,
		});
});

function handleRender(req, res, renderProps, store) {
    if (__DEVELOPMENT__) {
      webpackIsomorphicTools.refresh();
    }
    const component = (
      <Provider store={store} key="provider">
          <RoutingContext {...renderProps} />
        </Provider>
      );
    const content = renderToString(<Html component={component} assets={webpackIsomorphicTools.assets()} store={store}/>);
    res.send('<!doctype html>' + content);
}

function processRoute(req, res, initialState) {
		const store = createStore(initialState);
		const routes = getRoutes(store);

	  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {

				if (req.url === '/survey/fund/q/0') {
					// plaid API institutions request
					plaid.getInstitutions(plaid.environments.tartan, (err, data) => {
						store.dispatch(setBanks(data));
						handleRender(req, res, renderProps, store);
					});
				} else {
					  handleRender(req, res, renderProps, store);
				}
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
}

app.get('*', (req, res) => {
	const uid = req.cookies.uid;
	//const uid = 'anastacia160592@gmail.com';
	console.log('Request uid: ' + uid);
	if (uid) {
		User.findOneByUid(uid, (err, user) => {
			if (!err && user.state) {
				const initialState = user.state;
				processRoute(req, res, initialState);
			} else {
				processRoute(req, res);
			}
		});
	} else {
		processRoute(req, res);
	}
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', (process.env.HOST || 'localhost'), config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
