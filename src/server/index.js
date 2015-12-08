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

import User from './models/User';
import mainController from './controllers/main';
import createStore from '../redux/create';
import config from '../config';
import getRoutes from '../routes';
import Html from '../helpers/Html';

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

console.log(path);
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

function processRoute(req, res, initialState) {
		const store = createStore(initialState);
		const routes = getRoutes(store);

	  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
	    if (error) {
	      res.status(500).send(error.message);
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
	    } else if (renderProps) {
	      handleRender(req, res, renderProps, store);
	    } else {
	      res.status(404).send('Not found');
	    }
	  });
}

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


app.get('*', (req, res) => {
	const uid = req.cookies.uid;
	console.log('Got request with uid: ' + uid);

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
