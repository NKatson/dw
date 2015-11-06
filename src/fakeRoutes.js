import React from 'react';
import {Route} from 'react-router';
import ResetPassword from './components/ResetPassword/ResetPassword';
import App from './components/App';

export default () => (
  <Route path="/" component={App}>
    <Route path="about" component={ResetPassword} />
  </Route>
);
