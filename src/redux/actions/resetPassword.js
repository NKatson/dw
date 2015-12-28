import * as api from '../../utils/apiClient';
import { loginSuccess } from  './auth';

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
  console.log('CTS');
  console.log(body);
  return {
    type: CONFIRM_TOKEN_SUCCESS,
    email: body.email,
    client_id: body.client_id,
    token: body.token,
  };
}

export function resetSuccess({ message }) {
  return {
    type: RESET_SUCCESS,
    message,
  };
}

function resetFailure({ errors }) {
  return {
    type: RESET_FAILURE,
    error: errors.length > 0 ? errors[0] : 'Unexpected error.',
  };
}

function confirmSuccess() {
  return {
    type: CONFIRM_PASSWORD_SUCCESS,
    message: 'Your account has been saved!',
  }
}

function confirmFailure({ errors }) {
  return {
    type: CONFIRM_PASSWORD_FAILURE,
    error: errors && errors.length > 0 ? errors[0] : 'Unexpected error.',
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
  return dispatch => {
    dispatch(confirmTokenRequest());

    api.checkPasswordToken(token, (err, body) => {
      console.log('CPT');
      console.log(body);
      if (err) return dispatch(confirmTokenError()).then(() => cb('error'));
      dispatch(confirmTokenSuccess(body)).then(() => cb(null));
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
        console.log('start...');
        dispatch(confirmSuccess(body)).then(() => {
          console.log(body);
          console.log('callb1');
          dispatch(loginSuccess(body)).then(() => {
            console.log('callb2');
              const state = getState();
              api.saveState({ auth: state.auth.toJS()}, err => {
                  cb(err);
              })
          });
        });
      }
    });
  }
}
