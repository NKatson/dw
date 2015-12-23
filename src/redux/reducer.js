import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import auth from './reducers/auth';
import registration from './reducers/registration';
import resetPassword from './reducers/resetPassword';
import survey from './reducers/survey';
import plaid from './reducers/plaid';
import bundle from './reducers/bundle';
import docusign from './reducers/docusign';
import common from './reducers/common';

export default combineReducers({
  form,
  auth,
  registration,
  resetPassword,
  survey,
  plaid,
  bundle,
  docusign,
  common,
});
