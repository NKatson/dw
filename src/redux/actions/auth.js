import * as api from '../../utils/apiClient';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CONFIRM_TOKEN_REQUEST    = 'CONFIRM_TOKEN_REQUEST';
export const CONFIRM_TOKEN_SUCCESS    = 'CONFIRM_TOKEN_SUCCESS';
export const CONFIRM_TOKEN_ERROR      = 'CONFIRM_TOKEN_ERROR';

// Login actions

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess({ data: { email, name, nickname }, accessToken, uid, client, confirmed}) {
  return {
    type: LOGIN_SUCCESS,
    confirmed,
    user: {
      email,
      name,
      nickname,
      accessToken,
      uid,
      client,
    },
  };
}

function loginFailure({ errors }) {
  return {
    type: LOGIN_FAILURE,
    error: (errors && errors.length > 0) ? errors[0] : 'Unexpected error.',
  };
}

export function login(email, password, cb) {
  return dispatch => {
    dispatch(loginRequest());
    api.login({
      email,
      password,
      cb: (err, body) => {
        if (err) return dispatch(loginFailure(err));
        dispatch(loginSuccess({confirmed: true, ...body})).then(() => {
          cb();
        });
      },
    });
  };
}

export function isLoggedIn(state) {
  return state.auth.get('loggedIn');
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

export function logout(cb) {
  return dispatch => {
    dispatch(logoutRequest());
    api.logout({
      cb: (err, body) => {
        if (err) return dispatch(logoutFailure(err));
        dispatch(logoutSuccess()).then(() => {
          cb();
        });
      },
    });
  };
}

// confirm email

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

function confirmTokenSuccess(message = 'Success!') {
  return {
    type: CONFIRM_TOKEN_SUCCESS,
    message,
  };
}

export function checkEmailToken(token, cb) {
  return dispatch => {
    dispatch(confirmTokenRequest());
    api.confirmEmailToken(token, (err, body) => {
      if (err) return dispatch(confirmTokenError(err));
      dispatch(confirmTokenSuccess()).then(() => {
        cb();
      });
    });
  }
}

export function unlockToken(token, cb) {
  return dispatch => {
    dispatch(confirmTokenRequest());
    api.unlockToken(token, (err, body) => {
      if (err) return cb();
      dispatch(confirmTokenSuccess(body)).then(() => {
        cb();
      });
    });
  }
}
