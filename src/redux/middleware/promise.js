import { LOGIN_SUCCESS } from '../actions/auth';
import { Promise } from 'es6-promise';

export default (store) => next => action => {
  if (action.type === LOGIN_SUCCESS) {
    return Promise.resolve(action).then(next(action));
  }

  return next(action);
};
