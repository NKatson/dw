// import fetch from 'whatwg-fetch';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function loginRequest(email) {
  return {
    type: LOGIN_REQUEST,
    email: email,
  };
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    user: data.username,
    role: data.role,
  };
}

function loginFailure(email, error) {
  return {
    type: LOGIN_FAILURE,
    email,
    error,
  };
}

export function login(email, password) {
  return dispatch => {
    dispatch(loginRequest(email));

    return fetch('https://www.google.com/search?q=secret+sauce', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    .then(() => dispatch(loginSuccess(
      {user: 'John Doe', role: 'user'})))
     .catch(error => dispatch(loginFailure('test', error)));
  };
}
