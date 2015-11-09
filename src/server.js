import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router';
import { Provider } from 'react-redux'
import { Router } from 'react-router';

import createStore from './redux/create';
import config from './config';
import getRoutes from './routes';
import Html from './helpers/Html';

const routes = getRoutes();
const app = express();

app.use('/dist', express.static('./static/dist'));

function handleRender(req, res, renderProps) {
    if (__DEVELOPMENT__) {
      webpackIsomorphicTools.refresh();
    }
    const store = createStore();
    const component = (
      <Provider store={store} key="provider">
          <RoutingContext {...renderProps} />
        </Provider>
      );
    const content = renderToString(<Html component={component} assets={webpackIsomorphicTools.assets()} store={store}/>);
    res.send('<!doctype html>' + content);
}

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      handleRender(req, res, renderProps);
    } else {
      res.status(404).send('Not found');
    }
  });
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
