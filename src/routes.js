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
    function checkAuth() {
      const user = store.getState().auth.get('loggedIn');
      if (!user) {
        replaceState(null, '/signin');
      }
      cb();
    }
    checkAuth();
  };

  return (
    <Route path="/" component={App}>
      <Route onEnter={requireLogin} >
          <Route path="welcome" component={Welcome} />
          <Route path="reset" component={ResetPassword} />
      </Route>
      <Route path="signin" component={Authorization} />
      <Route path="signup" component={Registration} />
    </Route>
  );
};
