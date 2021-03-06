import * as api from '../../utils/apiClient';
import * as authActions from './auth';

export const RESET_REQUEST            = 'RESET_REQUEST';
export const RESET_SUCCESS            = 'RESET_SUCCESS';
export const RESET_FAILURE            = 'RESET_FAILURE';
export const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
export const CONFIRM_PASSWORD_FAILURE = 'CONFIRM_PASSWORD_FAILURE';
export const TIMER                    = 'TIMER';
export const CONFIRM_TOKEN_REQUEST    = 'CONFIRM_TOKEN_REQUEST';
export const CONFIRM_TOKEN_SUCCESS    = 'CONFIRM_TOKEN_SUCCESS';
export const CONFIRM_TOKEN_ERROR      = 'CONFIRM_TOKEN_ERROR';

function resetRequest() {
  return {
    type: RESET_REQUEST,
  };
}

function confirmTokenRequest() {
  return {
    type: CONFIRM_TOKEN_REQUEST,
  };
}

function confirmTokenError() {
  return {
    type: CONFIRM_TOKEN_ERROR,
  };
}

function confirmTokenSuccess(body) {
  return {
    type: CONFIRM_TOKEN_SUCCESS,
    data: body,
  };
}

export function resetSuccess({ message }) {
  return {
    type: RESET_SUCCESS,
    message,
  };
}

function resetFailure(err) {
  return {
    type: RESET_FAILURE,
    error: err,
  };
}

function confirmSuccess() {
  return {
    type: CONFIRM_PASSWORD_SUCCESS,
    message: 'Your account has been saved!',
  }
}

function confirmFailure(error) {
  return {
    type: CONFIRM_PASSWORD_FAILURE,
    error,
  };
}

export function setTimer(timer) {
  return {
    type: TIMER,
    timer
  }
}

export function reset(email) {
  return dispatch => {
    dispatch(resetRequest());
    api.reset({
      email,
      cb: (err, body) => {
        return err ? dispatch(resetFailure(err)) : dispatch(resetSuccess(body));
      },
    });
  };
}

export function checkPasswordToken(token, cb) {
  return (dispatch, getState) => {
    dispatch(confirmTokenRequest());

    api.checkPasswordToken(token, (err, body) => {
      console.log(err);
      if (err) return dispatch(confirmTokenError()).then(() => cb('error'));
      console.log('this...');
      console.log(body);
      dispatch(confirmTokenSuccess(body));
      dispatch(authActions.loginSuccess(body)).then(() => {
        console.log('Login success!');
        console.log(localStorage.uid);
        const state = getState();

        api.saveState({
          auth: state.auth.toJS(),
        }, (err) => {
            cb(err);
         });
      });
    });
  };
}

export function confirm(data, cb) {
  return (dispatch, getState) => {
    dispatch(resetRequest());
    api.confirmPassword({
      ...data,
      cb: (err, body) => {
        if (err) return dispatch(confirmFailure(err));
        dispatch(confirmSuccess(body)).then(() => {
          cb();
        });
      }
    });
  }
}
