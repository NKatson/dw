import * as api from '../../utils/apiClient';
import {loginSuccess} from '../actions/auth';

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


function registrationFailure({ errors: { full_messages }}) {
  return {
    type: REGISTRATION_FAILURE,
    error: full_messages.length > 0 ? full_messages[0] : 'Unexpected error.',
  };
}

export function registration(data, cb) {
  return dispatch => {
    dispatch(registrationRequest());
    api.registration({
      data,
      cb: (err, body) => {
        if (err) return dispatch(registrationFailure(err));

        dispatch(registrationSuccess());
        dispatch(loginSuccess({confirmed: false, ...body})).then(() => {
          cb();
        });
      },
    });
  };
}
