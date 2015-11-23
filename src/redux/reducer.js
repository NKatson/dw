import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import auth from './reducers/auth';
import registration from './reducers/registration';
import resetPassword from './reducers/resetPassword';
import survey from './reducers/survey';
import { normalizePhone } from '../utils/normalize';

export default combineReducers({
  form,
  auth,
  registration,
  resetPassword,
  survey,
});
