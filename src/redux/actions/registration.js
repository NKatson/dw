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

function registrationFailure(error) {
  return {
    type: REGISTRATION_FAILURE,
    error,
  };
}

export function registration(data, cb) {
  return (dispatch, getState) => {
    dispatch(registrationRequest());
    api.registration({
      data,
      cb: (err, body) => {
        if (err) return dispatch(registrationFailure(err));

        dispatch(registrationSuccess());
        console.log(body);
        dispatch(loginSuccess(body)).then(() => {
          const state = getState();
          api.saveState({ auth: state.auth.toJS()}, () => {
            //cb(null);
          })
        });
      },
    });
  };
}
