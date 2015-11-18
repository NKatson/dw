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
  const categories = Object.keys(action.data);
    return state.merge({
      requesting: false,
      category: categories.length > 0 ? categories[0] : null,
      step: 0,
      data: action.data,
    });
  case actions.TOGGLE_SSN:
    return state.merge({
      showSsn: state.get('showSsn')  ? false : true,
    });
  case actions.SELECT_CHANGE:
    return state.merge({
      selectValue: action.value,
    });
  default:
    return state;
  }
}
