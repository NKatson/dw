import * as actions from '../actions/survey';
import { Map, fromJS } from 'immutable';

const initialState = Map({
  requesting: false,
});

function getNextLink({ category, step, data }) {
  const categoryNames = Object.keys(data);
  const categoryIndex = categoryNames.indexOf(category);
  
  if (categoryIndex === -1) return '-1';
  // if last step in category
  if (data[category].length - 1 === step) {
    // if last category
    if (categoryIndex === categoryNames.length - 1) return '/submit';
    // change category and step to 0
    return `/survey/${categoryNames[categoryIndex + 1].toLowerCase()}/q/0`;
  }
  // step++ in current category
  return `/survey/${category.toLowerCase()}/q/${step+1}`
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
  case actions.SHOW_RECOMMEND:
    return state.merge({
      showRecommend: true,
    });
  case actions.SUBMIT_NEXT:
    const currentLink = `/survey/${state.get('category').toLowerCase()}/q/${state.get('step')}`;
    
    // if last step switch current category
    if (state.get('step') === state.getIn(['data', state.get('category')]).size - 1) {
      let nextCategory = null;
      
      if (currentIndex !== categoriesNames.length - 1) {
        nextCategory = categoriesNames[currentIndex + 1];
      }

      const nextFormType = nextCategory ? data[nextCategory][0].type : null;
      return state.merge({
        step: 0,
        categoryIndex: currentIndex + 1,
        category: nextCategory,
        formType: nextFormType,
        prevLink: currentLink,
        nextLink: getNextLink({ category: nextCategory, step: 0, data }),
      });
    }

    const nextStep = state.get('step') + 1;
    return state.merge({
      step: nextStep,
      formType: data[state.get('category')][nextStep].type,
      prevLink: currentLink,
      nextLink: getNextLink({ category: state.get('category'), step: nextStep, data }),
    });
  case actions.PREV_CLICKED:
    // if first step switch current category
    if (state.get('step') === 0) {
      let prevCategory = null;
      if (currentIndex > 0) {
        prevCategory = categoriesNames[currentIndex - 1];
      }

      return state.merge({
        step: data[prevCategory].length - 1,
        categoryIndex: currentIndex - 1,
        category: prevCategory,
        showRecommend: false,
      });
    }

    const prevStep = state.get('step') - 1;
    return state.merge({
      showRecommend: false,
      step: prevStep,
      formType: data[state.get('category')][prevStep].type,
    });
  default:
    return state;
  }
}
