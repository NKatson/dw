import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS} from '../actions/auth';

const initialState = {
  user: null,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {loggingIn: true});
  case LOGIN_FAILURE:
    return {
      ...state,
      loginError: action.error,
      user: {
        username: null,
        email: null,
      },
    };
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      loggingIn: false,
      loggedIn: true,
      loginError: false,
      user: {
        username: action.username,
        email: action.email,
      },
    });
  default:
    return state;
  }
}
