import * as actions from '../actions/docusign';

const initialState = {
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_LINK:
      return Object.assign({}, state, { link: action.link });
    case actions.GET_LINK_ERROR:
      return Object.assign({}, state, { error: action.error });
    case actions.SET_IS_DOCUSIGN:
      return Object.assign({}, state, { isDocusign: action.value });
    default:
      return state;
    }
}
