import * as actions from '../actions/docusign';

const initialState = {
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_LINK:
      return Object.assign({}, state, { link: action.link });
    case actions.SET_ERROR:
      return Object.assign({}, state, { error: action.error });
    case actions.SET_IS_DOCUSIGN:
      let error = state.error;
      if (action.value === false) {
        error = null
      }
      return Object.assign({}, state, {
        isDocusign: action.value,
        error,
       });
    default:
      return state;
    }
}
