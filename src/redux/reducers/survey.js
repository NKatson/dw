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
      categoryIndex: 0,
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
  case actions.NEXT_CLICKED:
    const data = state.get('data').toJS();
    const categoriesNames = Object.keys(data);
    const currentIndex = state.get('categoryIndex');

    // if last step switch current category
    if (state.get('step') === state.getIn(['data', state.get('category')]).size - 1) {
      let nextCategory = null;
      if (currentIndex !== categoriesNames.length - 1) {
        nextCategory = categoriesNames[currentIndex + 1];
      }

      return state.merge({
        step: 0,
        categoryIndex: currentIndex + 1,
        category: nextCategory,
      });
    }

    return state.merge({
      step: state.get('step') + 1
    });
  case actions.PREV_CLICKED:
    return state.merge({
      step: state.get('step') > 0 ? state.get('step') - 1 : 0
    });
  default:
    return state;
  }
}
