import * as actions from '../actions/bundle';

const initialState = {
  text: 'Traditional IRA',
  link: 'Roth IRA',
  header: 'Not problem. Just a few questions.',
};

export default function bundle(state = initialState, action = {}) {
  switch (action.type) {
    case actions.JOINT_CLICK:
      return Object.assign({}, state, {
        joint: action.value
      });
    default:
      return state;
  }
}
