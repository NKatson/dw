import * as api from '../../utils/apiClient';
import * as surveyActions from './survey';

export const LOGIN_REQUEST            = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS            = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE            = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST           = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS           = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE           = 'LOGOUT_FAILURE';

export const CONFIRM_TOKEN_REQUEST    = 'CONFIRM_TOKEN_REQUEST';
export const CONFIRM_TOKEN_SUCCESS    = 'CONFIRM_TOKEN_SUCCESS';
export const CONFIRM_TOKEN_ERROR      = 'CONFIRM_TOKEN_ERROR';

export const UPDATE_SESSION_TIMER_ID  = 'UPDATE_SESSION_TIMER_ID';

// Login actions

function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess({
  profile,
  data,
  accessToken,
  uid,
  client,
  email: bodyEmail,
}) {
  const source = profile || data;

  const firstName = source && source.first_name ? source.first_name : '';
  const confirmed = source && source.confirmed ? true : false;
  const email = bodyEmail || source.email || uid;

  if (!uid) {
    uid = bodyEmail;
  }

  return {
    type: LOGIN_SUCCESS,
    user: {
      confirmed,
      email,
      accessToken,
      uid,
      client,
      firstName,
    },
  };
}

function loginFailure({ errors }) {
  return {
    type: LOGIN_FAILURE,
    error: (errors && errors.length > 0) ? errors[0] : 'Unexpected error.',
  };
}

export function login(email, password, cb) {
  return (dispatch, getState) => {
    dispatch(loginRequest());
    api.login({
      email,
      password,
      cb: (err, body) => {
        if (err) return dispatch(loginFailure(err));
        dispatch(loginSuccess(body)).then(() => {
          // save state.auth to server
          const state = getState();
          api.saveState({ auth: state.auth.toJS()}, () => {
            cb();
          })
        });
      },
    });
  };
}

export function isLoggedIn(state) {
  return state.auth.get('loggedIn');
}

// Logout actions

function logoutRequest(user) {
  return {
    type: LOGOUT_REQUEST,
    user,
  };
}

function logoutSuccess(message = null) {
  return {
    type: LOGOUT_SUCCESS,
    message,
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error,
  };
}

export function logout(message, currentLink, cb = () => {}) {
  return (dispatch, getState) => {
    dispatch(logoutRequest());
    dispatch(surveyActions.setCurrentLink(currentLink)).then( () => {
      const state = getState();
      api.saveState({
        form: state.form,
        survey: state.survey.toJS(),
        auth: state.auth.toJS(),
        plaid: state.plaid,
      }, err => {
        if (err) return console.log('Can\'t save state: ' + err);
        api.logout({
          cb: (err, body) => {
            if (err) return dispatch(logoutFailure(err));
            dispatch(logoutSuccess(message)).then(() => {
              cb();
            });
          },
        });
      })
    });
  };
}

// confirm email

function confirmTokenRequest() {
  return {
    type: CONFIRM_TOKEN_REQUEST,
  };
}

function confirmTokenError() {
  return {
    type: CONFIRM_TOKEN_ERROR,
  };
}

function confirmTokenSuccess(message = 'Success!') {
  return {
    type: CONFIRM_TOKEN_SUCCESS,
    message,
  };
}

export function confirmEmail(token, cb) {
  return (dispatch, getState) => {
    dispatch(confirmTokenRequest());
    api.confirmEmailToken(token, (err, body) => {
      if (err) {
        dispatch(confirmTokenError(err));
        return cb(err);
      }
      dispatch(confirmTokenSuccess()).then(() => {
        dispatch(loginSuccess(body)).then(() => {
          const state = getState();
          api.saveState({
            auth: state.auth.toJS(),
          }, (err) => {
              cb(err);
           });
        });
      });
    });
  };
}

export function unlockToken(token, cb) {
  return dispatch => {
    dispatch(confirmTokenRequest());
    api.unlockToken(token, (err, body) => {
      if (err) return cb();
      dispatch(confirmTokenSuccess(body)).then(() => {
        cb();
      });
    });
  }
}
