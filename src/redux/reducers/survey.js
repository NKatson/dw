import * as actions from '../actions/survey';
import { Map, fromJS } from 'immutable';

const initialState = Map({
  requesting: false,
});

export default function survey(state = initialState, action = {}) {
  switch (action.type) {
  case actions.INITIAL_REQUEST:
    return state.merge({
      requesting: true,
    });
  case actions.FILL_STATE:
    return state.merge({
      requesting: false,
      data: action.data,
    });
  default:
    return state;
  }
}
