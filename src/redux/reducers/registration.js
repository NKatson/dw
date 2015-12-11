import { Map } from 'immutable';
import * as actions from '../actions/registration';

const initialState = Map();

export default function registration(state = initialState, action = {}) {
  switch (action.type) {
  case actions.REGISTRATION_REQUEST:
    return state.merge(Map({
      registeringIn: true,
    }));
  case actions.REGISTRATION_FAILURE:
    return state.merge(Map({
      registeringIn: false,
      registrationError: action.error,
    }));
  case actions.REGISTRATION_SUCCESS:
    return initialState;
  default:
    return state;
  }
}
