import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';
import { CONFIRM_PASSWORD_SUCCESS, CONFIRM_TOKEN_SUCCESS, CONFIRM_TOKEN_ERROR } from '../actions/resetPassword';
import { GET_DATA_REQUEST_ERROR, GET_DATA_REQUEST_SUCCESS, CHANGE_QUESTION } from '../actions/survey';
import { SET_ACCOUNTS } from '../actions/plaid';
import { Promise } from 'es6-promise';

export default (store) => next => action => {
  const actions = [
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CONFIRM_PASSWORD_SUCCESS,
    CONFIRM_TOKEN_SUCCESS,
    CONFIRM_TOKEN_ERROR,
    GET_DATA_REQUEST_ERROR,
    GET_DATA_REQUEST_SUCCESS,
    CHANGE_QUESTION,
    SET_ACCOUNTS,
  ];

  if (actions.indexOf(action.type) !== -1) {
    return Promise.resolve(action).then(next(action));
  }

  return next(action);
};
