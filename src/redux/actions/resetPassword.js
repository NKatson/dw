import * as api from '../../utils/apiClient';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILURE = 'RESET_FAILURE';

function resetRequest() {
  return {
    type: RESET_REQUEST,
  };
}

export function resetSuccess({ message }) {
  return {
    type: RESET_SUCCESS,
    message,
  };
}

function resetFailure({ errors }) {
  return {
    type: RESET_FAILURE,
    error: errors.length > 0 ? errors[0] : 'Unexpected error.',
  };
}

export function reset(email) {
  return dispatch => {
    dispatch(resetRequest());
    api.reset({
      email,
      cb: (err, body) => {
        return err ? dispatch(resetFailure(err)) : dispatch(resetSuccess(body));
      },
    });
  };
}
