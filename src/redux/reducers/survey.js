import * as actions from '../actions/survey';
import { Map, fromJS } from 'immutable';

const initialState = {
  requesting: false,
};

export default function survey(state = initialState, action = {}) {
  switch (action.type) {
  case actions.INITIAL_REQUEST:
    return {
      requesting: true,
    }
  case actions.FILL_STATE:
    return {
      requesting: false,
      data: action.data,
    }
  default:
    return state;
  }
}
