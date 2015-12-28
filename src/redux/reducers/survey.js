import * as actions from '../actions/survey';
import { Map, fromJS } from 'immutable';

const initialState = Map({
  showCategories: true,
  requesting: false,
  radio : Map(),
  showWelcomeBack: false,
  currentLink: '/welcome',
  termsAccepted: false,
});

export default function survey(state = initialState, action = {}) {
  const data = state.get('data') ? state.get('data').toJS() : {};
  const categoriesNames = Object.keys(data);

  switch (action.type) {
  case actions.GET_DATA_REQUEST:
    return state.merge({
      requesting: true,
    });
  case actions.GET_DATA_REQUEST_ERROR:
  case actions.GET_DATA_REQUEST_SUCCESS:
    return state.merge({
      requesting: false,
    });
  case actions.FILL_STATE:
    const categories = Object.keys(action.data);
    return state.merge({
      requesting: false,
      category: categories.length > 0 ? categories[0] : null,
      categoryIndex: 0,
      formType: categories.length > 0 ? action.data[categories[0]][0].type : null,
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
  case actions.ACCOUNT_TYPE_CHANGED:
    return state.merge({
      accountType: action.accountType,
      recommendMessageType: 'recommend',
    });
  case actions.SSN_ERROR_CHANGE:
    return state.merge({
      ssnError: action.error,
    });
  case actions.RADIO_CLICKED:
    return state.updateIn(['radio', action.name], action.name, value => action.value);
  case actions.SSN_CHANGE:
    let isValid = true;
    if (action.ssn.length > 0) {
        isValid = /(^\d{9}$)/.exec(action.ssn) ? true : false;
    }
    return state.merge({
      storedSsn: action.ssn,
      ssnError: isValid ? null : 'Please type valid SSN',
    });
  case actions.SHOW_WELCOME_BACK:
    return state.merge({
      showWelcomeBack: true,
    });
  case actions.HIDE_WELCOME_BACK:
    return state.merge({
      showWelcomeBack: false,
    });
  case actions.TERMS_TOGGLE:
    return state.merge({
      termsAccepted: action.isAccepted,
    });
  case actions.FEEDBACK_SUCCESS:
    return state.merge({
      feedbackSuccess: true,
    });
  case actions.FEEDBACK_FAILED:
    return state.merge({
      feedbackFailed: true,
    });
  case actions.SET_CATEGORY_INDEX:
    return state.merge({
      categoryIndex: action.index,
    });
  case actions.SET_CURRENT_LINK:
    return state.merge({
      currentLink: action.link,
    });
  case actions.SET_PREV_LINK:
    return state.set('prevLink', action.link);
  case actions.SET_NEXT_LINK:
    return state.set('nextLink', action.link);
  case actions.SET_SHOW_CATEGORIES:
    return state.set('showCategories', action.show);
  default:
    return state;
  }
}
