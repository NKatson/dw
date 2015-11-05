import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routerStateReducer} from 'redux-router';
import auth from './reducers/auth';
import registration from './reducers/registration';

export default combineReducers({
  form,
  auth,
  registration,
  router: routerStateReducer,
});
