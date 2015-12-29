import * as actions from '../actions/bundle';

const initialState = {
  accountType: 'traditional',
  accountText: 'Traditional IRA',
  accountLink: 'Roth IRA',
  header: 'No problem. Just a few questions.',
  showModal: false,
  joint: null,
  success: null,
  step: null,
  income: null,
  resetValue: null,
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
      let success = null;

      if (state.step === 1 && state.joint === 'yes') {
        question = null;
        if (state.income > 183000) {
          header = 'Sorry. Your income exceeds government levels for Roth IRA eligibility.';
          success = false;
        } else {
          header = 'You are eligible for a Roth IRA.';
          success = true;
        }
      }

      if (!state.step && state.joint === 'no') {
        question = null;
        if (action.employeeIncome > 116000) {
          header = 'Sorry. Your income exceeds government levels for Roth IRA eligibility.';
          success = false;
        } else {
          header = 'You are eligible for a Roth IRA.';
          success = true;
        }
      }
      return Object.assign({}, state, {
        header,
        question,
        success,
        step: state.step ? state.step + 1 : 1,
      });
    case actions.SHOW_MODAL:
      return Object.assign({}, state, {
        showModal: true,
      });
    case actions.HIDE_MODAL:
      return Object.assign({}, state, {
        showModal: false,
        resetValue: null,
      });
    case actions.CHANGE_ACCOUNT_TYPE:
      return Object.assign({}, state, {
        accountText: 'Roth IRA',
        accountLink: 'Traditional IRA',
        accountType: state.joint === 'yes' ? 'joint_roth' : 'individual_roth',
      });
    case actions.UPDATE_INCOME:

      let val = action.value.replace(/[,\$\s]/g, '');
      val = val ? val = parseInt(val) : 0;

      return Object.assign({}, state, {
        income: val,
      });
    case actions.RESET_CHECKBOX:
      return Object.assign({}, state, {
        resetValue: action.value,
      });
    case actions.RESET_ACCOUNT:
      return initialState;
    default:
      return state;
  }
}
