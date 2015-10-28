import 'whatwg-fetch';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const host = 'http://localhost:2000/';

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    user: data.username,
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
    dispatch(loginRequest());

    return fetch(host + 'auth', {
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
    .then(res => {
      console.log(res);
      return dispatch(loginSuccess({
        username: 'John Doe',
        role: 'user',
      }));
    })
    .catch(function(error) {
      console.log(error);
    });
  };
}
