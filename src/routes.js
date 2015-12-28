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
  ConfirmPasswordForm,
  ConfirmEmail,
  SurveyWrapper,
  Feedback,
} from './containers';

import { App } from './containers';

import {
  PersonalForm,
  EmploymentContainer,
  RiskForm,
  Check,
  Accounts,
 } from './forms';

 import {
   Bundle,
   ConnectBank,
   MailCheck,
   Transfer,
   Docusign,
 } from './pages';

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

      <Route component={SurveyWrapper} onEnter={requireLogin}>
        <Route component={Survey}>
            <Route path="/survey/basicinfo" component={PersonalForm} />
            <Route path="/survey/employment" component={EmploymentContainer} />
            <Route path="/survey/risks" component={RiskForm} />
            <Route path="/survey/bundle" component={Bundle} />
            <Route path="/survey/banks" component={ConnectBank} />
            <Route path="/survey/check" component={Check} />
            <Route path="/survey/mail" component={MailCheck} />
            <Route path="/survey/transfer" component={Transfer} />
            <Route path="/survey/accounts" component={Accounts} />
            <Route path="/survey/docusign" component={Docusign} />

            <Route path="/feedback" component={Feedback} />
            <Route path="check" component={Check} />
            <Route path="/dashboard" component={Dashboard} />
        </Route>
        <Route path="/welcome" component={Welcome} />
      </Route>
      
      <Redirect from="/" to="/welcome" />
      <Route path="/redirect-to-dashboard" component={_Redirect} />
    </Route>
  );
};
