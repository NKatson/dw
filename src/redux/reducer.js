import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import auth from './reducers/auth';

export default combineReducers({
  form,
  auth,
});
