import * as api from '../../utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Login actions

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginSuccess({email, username}) {
  return {
    type: LOGIN_SUCCESS,
    email,
    username,
  };
}

function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(loginRequest());
    api.login({
      email,
      password,
      cb: (err, body) => {
        return err ? dispatch(loginFailure(err)) : dispatch(loginSuccess(body));
      },
    });
  };
}

// Logout actions

function logoutRequest(user) {
  return {
    type: LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
}

export function logout(user) {
  return dispatch => {
    dispatch(logoutRequest());
    api.logout({
      user,
      cb: (err, body) => {
        return err ? dispatch(logoutFailure(err)) : dispatch(logoutSuccess());
      },
    });
  };
}
