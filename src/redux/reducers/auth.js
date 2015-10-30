import * as actions from '../actions/auth';

const initialState = {
  user: null,
  loggedIn: false,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
  case actions.LOGIN_REQUEST:
    return Object.assign({}, state, {
      loggingIn: true,
      loginError: '',
    });
  case actions.LOGIN_FAILURE:
    return {
      ...state,
      loggingIn: false,
      loginError: action.error,
      user: {
        username: null,
        email: null,
      },
    };
  case actions.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      loggingIn: false,
      loggedIn: true,
      loginError: '',
      user: {
        username: action.username,
        email: action.email,
      },
    });
  case actions.LOGOUT_REQUEST:
    return {
      ...state,
      loggingOut: true,
    };
  case actions.LOGOUT_SUCCESS:
    return {
      ...state,
      loggingOut: false,
      user: null,
      loggedIn: false,
      logoutError: '',
    };
  case actions.LOGOUT_FAILURE:
    return {
      ...state,
      loggingOut: false,
      logoutError: action.error,
    };
  default:
    return state;
  }
}
