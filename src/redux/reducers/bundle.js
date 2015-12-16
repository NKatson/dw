import * as actions from '../actions/bundle';

const initialState = {
  text: 'Traditional IRA',
  link: 'Roth IRA',
  header: 'Not problem. Just a few questions.',
  question: 'Do you fill taxes jointly?',
  showModal: false,
};

export default function bundle(state = initialState, action = {}) {
  switch (action.type) {
    case actions.JOINT_CLICK:
      return Object.assign({}, state, {
        joint: action.value,
      });
    case actions.BUTTON_CLICK:
      let header = state.header;
      let question = state.question;

      if (state.step === 1) {
        question = null;
        if (state.income > 183000) {
          header = 'Sorry. Your income exceeds government levels for Roth IRA eligibility.';
        } else {
          header = 'You are eligible for a Roth IRA.';
        }
      }
      return Object.assign({}, state, {
        header,
        question,
        step: state.step ? state.step + 1 : 1,
      });
    case actions.SHOW_MODAL_TOGGLE:
      return Object.assign({}, state, {
        showModal: !state.showModal,
      });
    case actions.UPDATE_INCOME:

      let val = action.value.replace(/[,\$\s]/g, '');
      val = val ? val = parseInt(val) : 0;

      return Object.assign({}, state, {
        income: val,
      });
    default:
      return state;
  }
}
