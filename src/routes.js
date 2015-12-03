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
    ConfirmEmail,
  } from './containers';

import { App } from './containers';

export default (store) => {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      if (!store.getState().auth.get('loggedIn')) {
        replaceState(null, '/signin');
      }
      cb();
    }
    checkAuth();
  };

  return (
    <Route>
      <Route component={App} >
        <Route path="reset" component={ResetPassword} />
        <Route path="confirm-email" component={ConfirmEmail} />
        <Route path="confirm-password" component={ConfirmPasswordForm} />
        <Route path="signin" component={Authorization} />
        <Route path="signup" component={Registration} />
      </Route>

      <Route path="/welcome" component={Welcome} />
      <Route path="/survey" component={Survey}>
          <IndexRoute component={FormContainer} />
          <Route path="/account" component={Account} />
          <Route path=":category/q/:number" component={FormContainer} />
      </Route>
      <Route path="submit" component={Submit} />
      <Route path="/submit" component={SubmitData} />

      <Redirect from="/" to="/signin" />
    </Route>
  );
};
