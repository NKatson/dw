import * as actions from '../actions/resetPassword';
import {Map, fromJS} from 'immutable';

const initialState = Map({
  sent: false,
});

export default function reset(state = initialState, action = {}) {
  switch (action.type) {
  case actions.RESET_REQUEST:
    return state.merge(Map({
      timer: null,
      resetting: true,
    }));
  case actions.RESET_FAILURE:
    return state.merge(Map({
      resetting: false,
      resetError: action.error,
    }));
  case actions.RESET_SUCCESS:
    return fromJS({
      sent: true, // get rid of this
      message: action.message,
    });
  case actions.CONFIRM_TOKEN_REQUEST:
    return state.merge(Map({
      confirmingToken: true,
    }));
  case actions.CONFIRM_TOKEN_ERROR:
    return state.merge(Map({
      confirmingToken: false,
      confirmTokenError: 'Error',
    }));
  case actions.CONFIRM_TOKEN_SUCCESS:
    return state.merge(Map({
      data: action.data,
      confirmingToken: false,
      confirmTokenError: null,
      tokenConfirmed: true,
      confirmError: null,
    }));
  case actions.CONFIRM_PASSWORD_FAILURE:
    return state.merge(Map({
      resetting: false,
      confirmError: action.error,
    }));
  case actions.CONFIRM_PASSWORD_SUCCESS:
    return state.merge(Map({
      message: action.message,
      resetting: false,
      confirmError: null,
      confirmTokenError: null,
    }));
  case actions.TIMER:
    return state.merge(Map({
      timer: action.timer,
    }));
  default:
    return state;
  }
}
