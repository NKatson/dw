import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import { isLoggedIn } from './redux/actions/auth';
import { Category, Submit } from './components';

import {
    Registration,
    Authorization,
    ResetPassword,
    Welcome,
    Survey,
    FormContainer,
    Account,
    Submit as SubmitData,
    ConfirmPasswordForm,
    ConfirmRegistration,
  } from './containers';

import { App } from './containers';

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
    <Route>
      <Route component={App} >
        <Route path="welcome" component={Welcome} />
        <Route path="reset" component={ResetPassword} />
        <Route path="/confirm-password" component={ConfirmPasswordForm} />
        <Route path="confirm-email" component={ConfirmRegistration} />
        <Route path="submit" component={Submit} />
        <Route path="/submit" component={SubmitData} />
        <Route path="signin" component={Authorization} />
        <Route path="signup" component={Registration} />
        <Route onEnter={requireLogin} >
        </Route>
      </Route>
      <Route path="/survey" component={Survey}>
          <IndexRoute component={FormContainer} />
          <Route path="/account" component={Account} />
          <Route path=":category/q/:number" component={FormContainer} />
      </Route>
      <Redirect from="/" to="signin" />
    </Route>
  );
};
