import * as auth from '../actions/auth';
import * as resetPassword from '../actions/resetPassword';
import * as survey from '../actions/survey';
import * as plaid from '../actions/plaid';
import { Promise } from 'es6-promise';

export default (store) => next => action => {
  const actions = [
    auth.LOGIN_SUCCESS,
    auth.LOGOUT_SUCCESS,
    resetPassword.CONFIRM_PASSWORD_SUCCESS,
    resetPassword.CONFIRM_TOKEN_SUCCESS,
    resetPassword.CONFIRM_TOKEN_ERROR,
    survey.GET_DATA_REQUEST_ERROR,
    survey.GET_DATA_REQUEST_SUCCESS,
    survey.CHANGE_QUESTION,
    plaid.SET_ACCOUNTS,
    plaid.SET_BANKS,
    survey.FEEDBACK_FAILED,
    survey.FEEDBACK_SUCCESS,
    survey.FILL_STATE,
    survey.SET_CURRENT_LINK,
  ];

  if (actions.indexOf(action.type) !== -1) {
    return Promise.resolve(action).then(next(action));
  }

  return next(action);
};
