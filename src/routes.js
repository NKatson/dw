import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isLoggedIn } from './redux/actions/auth';
import { Category } from './components';

import {
    App,
    Registration,
    Authorization,
    ResetPassword,
    Welcome,
    Survey,
    FormContainer,
    Account,
    Submit,
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
      <Route path="submit" component={Submit} />
      <Route path="survey" component={Survey}>
          <IndexRoute component={FormContainer} />
          <Route path="/account" component={Account} />
          <Route path=":category/q/:number" component={FormContainer} />
      </Route>
      <Route path="signin" component={Authorization} />
      <Route path="signup" component={Registration} />
    </Route>
  );
};
