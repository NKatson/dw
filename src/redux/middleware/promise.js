import { LOGIN_SUCCESS } from '../actions/auth';

export default (store) => next => action {
  if (action.type === LOGIN_SUCCESS) {
    const promise = new Promise((resolve) => {

    });
  }

  return next(action);
};
