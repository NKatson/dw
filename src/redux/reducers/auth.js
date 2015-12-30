import * as actions from '../actions/auth';
import {Map, fromJS} from 'immutable';

const initialState = Map({
  loggedIn: false,
});

export default function auth(state = initialState, action = {}) {

  switch (action.type) {
  case actions.LOGIN_REQUEST:
    return state.merge(Map({
      loggingIn: true,
    }));
  case actions.LOGIN_FAILURE:
    return state.merge(Map({
      loggingIn: false,
      loginError: action.error,
    }));
  case actions.LOGIN_SUCCESS:
    return state.merge(Map({
      loggingIn: false,
      loggedIn: true,
      user: action.user,
    }));
  case actions.LOGOUT_REQUEST:
    return state.merge(Map({
      loggingOut: true,
    }));
  case actions.LOGOUT_SUCCESS:
    return initialState.merge(Map({
      loginError: action.message,
    }));
  case actions.LOGOUT_FAILURE:
    return state.merge(Map({
      logoutError: action.error,
    }));
  case actions.CONFIRM_TOKEN_REQUEST:
    return state.merge(Map({
    }));
  case actions.CONFIRM_TOKEN_ERROR:
    return state.merge(Map({
      confirmTokenError: 'Error',
    }));
  case actions.CONFIRM_TOKEN_SUCCESS:
    return state.merge(Map({
      confirmTokenError: null,
      confirmed: true,
      loginError: action.message,
    }));
  default:
    return state;
  }
}
