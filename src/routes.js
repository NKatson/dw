import React from 'react';
import { Route } from 'react-router';
import { ResetPassword } from './components';

import {
    App,
    Registration,
    Authorization,
  } from './containers';

export default () => (
  <Route path="/" component={App}>
    <Route path="signin" component={Authorization} />
    <Route path="signup" component={Registration} />
    <Route path="reset" component={ResetPassword} />
  </Route>
);
