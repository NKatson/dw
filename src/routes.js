import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import { isLoggedIn } from './redux/actions/auth';
import {
  Category,
  Redirect as _Redirect,
  Dashboard,
} from './components';

import {
    Registration,
    Authorization,
    ResetPassword,
    Welcome,
    Survey,
    FormContainer,
    Submit as SubmitData,
    ConfirmPasswordForm,
    ConfirmEmail,
    SurveyWrapper,
    Feedback,
    Check,
  } from './containers';

import { App } from './containers';

import { PersonalForm } from './forms';

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
      
      <Route component={SurveyWrapper}>
        <Route path="/survey" component={Survey}>
            <Route path="basicinfo" component={PersonalForm} />
            <Route path="/submit" component={SubmitData} />
            <Route path="feedback" component={Feedback} />
            <Route path="check" component={Check} />
            <Route path="/dashboard" component={Dashboard} />
        </Route>
        <Route path="/welcome" component={Welcome} />
        <Redirect from="/survey" to="/survey/personal/q/0" />
        <Redirect from="/" to="/signin" />
      </Route>
      
      <Route path="/redirect-to-dashboard" component={_Redirect} />
    </Route>
  );
};
