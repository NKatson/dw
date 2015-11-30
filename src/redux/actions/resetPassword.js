import * as api from '../../utils/apiClient';

export const RESET_REQUEST            = 'RESET_REQUEST';
export const RESET_SUCCESS            = 'RESET_SUCCESS';
export const RESET_FAILURE            = 'RESET_FAILURE';
export const CONFIRM_PASSWORD_SUCCESS = 'CONFIRM_PASSWORD_SUCCESS';
export const CONFIRM_PASSWORD_FAILURE = 'CONFIRM_PASSWORD_FAILURE';
export const TIMER                    = 'TIMER';

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

function confirmSuccess({ message }) {
  return {
    type: CONFIRM_PASSWORD_SUCCESS,
    message,
  }
}

function confirmFailure({ errors }) {
  return {
    type: CONFIRM_PASSWORD_FAILURE,
    error: errors.length > 0 ? errors[0] : 'Unexpected error.',
  };
}

export function setTimer(timer) {
  return {
    type: TIMER,
    timer
  }
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

export function confirm(data, cb) {
  return dispatch => {
    dispatch(resetRequest());
    
    api.checkResetPasswordToken(token, (err, body) => {
      if (err) return cb('1');
      
      // api.confirmPassword({
      //   ...data,
      //   cb: (err, body) => {
      //     if (err) return dispatch(confirmFailure(err));
      //     dispatch(confirmSuccess(body)).then(() => {
      //       cb();
      //     });
      //   }
      // });
    });
  };
}
