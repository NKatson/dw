import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
    App,
    Registration,
    Authorization,
    ResetPassword,
    Welcome,
  } from './containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    console.log(nextState);
    replaceState({ nextPathname: nextState.location.pathname }, '/signin');
  };
  return (
    <Route path="/" component={App}>
      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="reset" component={ResetPassword} />
      </Route>
      <Route path="signin" component={Authorization} />
      <Route path="signup" component={Registration} />
    </Route>
  );
};
