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
  return (
    <Route path="/" component={App}>
      <Route path="reset" component={ResetPassword} />
      <Route path="welcome" component={Welcome} />
      <Route path="signin" component={Authorization} />
      <Route path="signup" component={Registration} />
    </Route>
  );
};
