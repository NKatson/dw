import * as api from '../../utils/api';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

function registrationRequest() {
  return {
    type: REGISTRATION_REQUEST,
  };
}

function registrationSuccess({email, username}) {
  return {
    type: REGISTRATION_SUCCESS,
    email,
    username,
  };
}

function registrationFailure(error) {
  return {
    type: REGISTRATION_FAILURE,
    error,
  };
}

export function registration(data) {
  return dispatch => {
    dispatch(registrationRequest());
    api.registration({
      data,
      cb: (err, body) => {
        return err ? dispatch(registrationFailure(err)) : dispatch(registrationSuccess(body));
      },
    });
  };
}
