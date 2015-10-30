import * as actions from '../actions/registration';

export default function registration(state = {}, action = {}) {
  switch (action.type) {
  case actions.REGISTRATION_REQUEST:
    return Object.assign({}, state, {
      registeringIn: true,
      registrationError: '',
    });
  case actions.REGISTRATION_FAILURE:
    return {
      ...state,
      registeringIn: false,
      registrationError: action.error,
    };
  case actions.REGISTRATION_SUCCESS:
    return {registeringIn: false};
  default:
    return state;
  }
}
