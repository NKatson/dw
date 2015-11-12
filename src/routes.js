import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {isLoggedIn} from './redux/actions/auth';

import {
    App,
    Registration,
    Authorization,
    ResetPassword,
    Welcome,
    Logout,
  } from './containers';


export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      if (!isLoggedIn()) {
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
