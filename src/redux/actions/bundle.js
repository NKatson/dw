import * as api from '../../utils/apiClient';

export const JOINT_CLICK = 'JOINT_CLICK';
export const BUTTON_CLICK = 'BUTTON_CLICK';
export const SHOW_MODAL_TOGGLE = 'SHOW_MODAL_TOGGLE';
export const UPDATE_INCOME = 'UPDATE_INCOME';

export function joint(value) {
  return {
    type: JOINT_CLICK,
    value,
  }
}

export function buttonClick() {
  return {
    type: BUTTON_CLICK,
  }
}

export function showModalToggle() {
  return {
    type: SHOW_MODAL_TOGGLE,
  }
}

export function updateIncome(value) {
  return {
    type: UPDATE_INCOME,
    value,
  }
}
