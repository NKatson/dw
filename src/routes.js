import React from 'react';
import { Route } from 'react-router';
import {isLoggedIn} from './redux/actions/auth';

import {
    App,
    Registration,
    Authorization,
    ResetPassword,
    Welcome,
    Survey,
  } from './containers';


export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      if (!isLoggedIn(store.getState())) {
        replaceState(null, '/signin');
      }
      cb();
    }
    checkAuth();
  };

  return (
    <Route path="/" component={App}>
      <Route path="welcome" component={Welcome} />
      <Route onEnter={requireLogin} >

          <Route path="reset" component={ResetPassword} />
      </Route>
      <Route path="survey" component={Survey} />
      <Route path="signin" component={Authorization} />
      <Route path="signup" component={Registration} />
    </Route>
  );
};
