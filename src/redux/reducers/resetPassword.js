import * as actions from '../actions/resetPassword';
import {Map, fromJS} from 'immutable';

const initialState = Map({
  sent: false,
});

export default function reset(state = initialState, action = {}) {
  switch (action.type) {
  case actions.RESET_REQUEST:
    return state.merge(Map({
      resetting: true,
    }));
  case actions.RESET_FAILURE:
    return state.merge(Map({
      resetting: false,
      resetError: action.error,
    }));
  case actions.RESET_SUCCESS:
    return fromJS({
      sent: true,
      message: action.message,
    });
  default:
    return state;
  }
}
