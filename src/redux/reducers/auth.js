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
    return fromJS({
      loggedIn: true,
      user: action.user,
    });
  case actions.LOGOUT_REQUEST:
    return state.merge(Map({
      loggingOut: true,
    }));
  case actions.LOGOUT_SUCCESS:
    return initialState;
  case actions.LOGOUT_FAILURE:
    return state.merge(Map({
      logoutError: action.error,
    }));
  default:
    return state;
  }
}
