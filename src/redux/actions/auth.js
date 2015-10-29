import * as api from '../../utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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
