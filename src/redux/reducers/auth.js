import {LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS} from '../actions/auth';

const initialState = {
  auth: null,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return Object.assign({}, state, {loggingIn: true});
  case LOGIN_FAILURE:
    return {
      ...state,
      loggingIn: false,
      username: null,
      email: null,
      loginError: action.error,
    };
  case LOGIN_SUCCESS:
    return Object.assign({}, state, {
      loggingIn: false,
      username: action.username,
      email: action.email,
    });
  default:
    return state;
  }
}
