import * as api from '../../utils/apiClient';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

function resetRequest() {
  return {
    type: RESET_REQUEST,
  };
}

export function resetSuccess() {
  return {
    type: RESET_SUCCESS,
  };
}

function resetFailure(error) {
  return {
    type: RESET_FAILURE,
    error,
  };
}

export function reset(email) {
  return dispatch => {
    dispatch(resetRequest());
    api.reset({
      email,
      cb: (err) => {
        return err ? dispatch(resetFailure(err)) : dispatch(resetSuccess());
      },
    });
  };
}
