import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';
import { Promise } from 'es6-promise';

export default (store) => next => action => {
  const actions = [LOGIN_SUCCESS, LOGOUT_SUCCESS];
  if (actions.indexOf(action.type) !== -1) {
    return Promise.resolve(action).then(next(action));
  }

  return next(action);
};
