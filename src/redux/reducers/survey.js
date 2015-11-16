import * as actions from '../actions/survey';
import {Map, fromJS} from 'immutable';

const initialState = Map();

export default function auth(state = initialState, action = {}) {

  switch (action.type) {
  case actions.LOGIN_REQUEST:
    return state.merge({
      requesting: true,
    });
  default:
    return state;
  }
}
