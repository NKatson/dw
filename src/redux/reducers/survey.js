import * as actions from '../actions/survey';
import { Map, fromJS } from 'immutable';

const initialState = Map({
  requesting: false,
  radio : Map(),
  showWelcomeBack: false,
});

function getPrevLink({ category, step, data }) {
  const categoryNames = Object.keys(data);
  const categoryIndex = categoryNames.indexOf(category);

  if (categoryIndex === -1) return '-1';
  if (step === 0) {
    if (categoryIndex === 0) return '/welcome';
    const prevCat = categoryNames[categoryIndex - 1];
    const lastQuestionIndex = Object.keys(data[prevCat]).length - 1;
    return `/survey/${prevCat.toLowerCase()}/q/${lastQuestionIndex}`;
  }

  return `/survey/${category.toLowerCase()}/q/${step - 1}`;
}

function getNextLink({ category, step, data }) {
  const categoryNames = Object.keys(data);
  const categoryIndex = categoryNames.indexOf(category);

  if (categoryIndex === -1) return '-1';
  // if last step in category
  if (data[category].length - 1 === step) {
    // if last category
    if (categoryIndex === 1) return '/submit';
    // change category and step to 0
    return `/survey/${categoryNames[categoryIndex + 1].toLowerCase()}/q/0`;
  }
  // step++ in current category
  return `/survey/${category.toLowerCase()}/q/${step + 1}`;
}

export default function survey(state = initialState, action = {}) {
  const data = state.get('data') ? state.get('data').toJS() : {};
  const categoriesNames = Object.keys(data);
  const currentIndex = state.get('categoryIndex');

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
      formType: categories.length > 0 ? action.data[categories[0]][0].type : null,
      step: 0,
      nextLink: getNextLink({ category: categories[0], step: 0, data: action.data }),
      prevLink: getPrevLink({ category: categories[0], step: 0, data: action.data }),
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
  case actions.CHANGE_QUESTION:
    if (state.get('step') === action.number && state.get('category').toLowerCase() === action.category) return state;

    const currentLink = `/survey/${state.get('category').toLowerCase()}/q/${state.get('step')}`;
    const categoryNames = Object.keys(data).map(key => key.toLowerCase());
    const catIndex = categoryNames.indexOf(action.category);
    const nextCategory = catIndex !== -1 ? (action.category.charAt(0).toUpperCase() + action.category.slice(1)) : null;

    return state.merge({
      category: nextCategory,
      categoryIndex: catIndex,
      step: action.number,
      nextLink: getNextLink({ category: nextCategory, step: action.number, data }),
      prevLink: getPrevLink({ category: nextCategory, step: action.number, data }),
      formType: data[nextCategory][action.number].type,
    });
  case actions.SHOW_WELCOME_BACK:
    return state.merge({
      showWelcomeBack: true,
    });
  default:
    return state;
  }
}
