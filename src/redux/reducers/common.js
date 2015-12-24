import * as actions from '../actions/common';

const initialState = {
  forceWelcome: false,
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_FORCE_WELCOME:
      return Object.assign({}, state, { forceWelcome: true });
    default:
      return state;
    }
}
