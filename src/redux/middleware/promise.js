import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';
import { Promise } from 'es6-promise';

export default (store) => next => action => {
  if (action.type === LOGIN_SUCCESS || action.type === LOGOUT_SUCCESS) {
    return Promise.resolve(action).then(next(action));
  }

  return next(action);
};
