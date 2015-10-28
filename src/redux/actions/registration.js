import 'whatwg-fetch';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

function registrationRequest() {
  return {
    type: REGISTRATION_REQUEST,
  };
}

function registrationSuccess() {
  return {
    type: REGISTRATION_SUCCESS,
  };
}

function registrationFailure() {
  return {
    type: REGISTRATION_FAILURE,
  };
}

export function register(email, password) {

}
