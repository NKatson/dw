import * as api from '../../utils/apiClient';

export const JOINT_CLICK = 'JOINT_CLICK';
export const BUTTON_CLICK = 'BUTTON_CLICK';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const UPDATE_INCOME = 'UPDATE_INCOME';
export const CHANGE_ACCOUNT_TYPE = 'CHANGE_ACCOUNT_TYPE';
export const RESET_ACCOUNT = 'RESET_ACCOUNT';
export const RESET_CHECKBOX = 'RESET_CHECKBOX';

export function joint(value) {
  return {
    type: JOINT_CLICK,
    value,
  }
}

export function resetAccount(value) {
  return {
    type: RESET_ACCOUNT,
  }
}

export function resetCheckbox(value) {
  return {
    type: RESET_CHECKBOX,
    value,
  }
}

export function buttonClick(employeeIncome) {
  return {
    type: BUTTON_CLICK,
    employeeIncome,
  }
}

export function showModal() {
  return {
    type: SHOW_MODAL,
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
  }
}

export function updateIncome(value) {
  return {
    type: UPDATE_INCOME,
    value,
  }
}

export function resetAccount() {{
  return {
    type: RESET_ACCOUNT,
  }
}}

export function changeAccount(accountType = 'Roth IRA') {
  return {
    type: CHANGE_ACCOUNT_TYPE,
    accountType,
  }
}
