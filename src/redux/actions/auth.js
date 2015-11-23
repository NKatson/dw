import * as api from '../../utils/apiClient';

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
  return (state.auth.get('loggedIn') || localStorage.accessToken) ? true : false;
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
        delete localStorage.accessToken;
        delete localStorage.uid;
        delete localStorage.client;

        dispatch(logoutSuccess()).then(() => {
          cb();
        });
      },
    });
  };
}
