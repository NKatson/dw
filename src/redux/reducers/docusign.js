import * as actions from '../actions/docusign';

const initialState = {
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_LINK:
      return Object.assign({}, state, { link: action.link });
    default:
      return state;
    }
}
