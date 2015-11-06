import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import auth from './reducers/auth';
import registration from './reducers/registration';

export default combineReducers({
  form,
  auth,
  registration,
});
