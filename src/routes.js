import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import { isLoggedIn } from './redux/actions/auth';
import { Category } from './components';

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
    AppWrapper
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
      <Route component={AppWrapper}>
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
            <Route path="/submit" component={SubmitData} />
        </Route>
        <Redirect from="/" to="/signin" />
      </Route>
    </Route>
  );
};
