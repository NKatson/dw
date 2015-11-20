import * as api from '../../utils/apiClient';

export const INITIAL_REQUEST = 'INITIAL_REQUEST';
export const FILL_STATE = 'FILL_STATE';
export const TOGGLE_SSN = 'TOGGLE_SSN';
export const SELECT_CHANGE = 'SELECT_CHANGE';
export const SUBMIT_NEXT = 'SUBMIT_NEXT';
export const SHOW_RECOMMEND = 'SHOW_RECOMMEND';
export const ACCOUNT_TYPE_CHANGED = 'ACCOUNT_TYPE_CHANGED';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';
export const HIDE_RECOMMEND = 'HIDE_RECOMMEND';

function initialRequest() {
  return {
    type: INITIAL_REQUEST,
  };
}

function fillState(data) {
  return {
    type: FILL_STATE,
    data,
  };
}

export function selectChange(value) {
  return {
    type: SELECT_CHANGE,
    value,
  }
}

export function accountTypeChanged(type) {
  return {
    type: ACCOUNT_TYPE_CHANGED,
    accountType: type,
  }
}

export function changeQuestion(category, number) {
  return {
    type: CHANGE_QUESTION,
    category,
    number,
  }
}

export function showRecommend(messageType = 'recommend') {
  return {
    type: SHOW_RECOMMEND,
    messageType
  }
}

export function hideRecommend() {
  return {
    type: HIDE_RECOMMEND,
  }
}

export function toggleSsn() {
  return {
    type: TOGGLE_SSN
  }
}

export function getData() {
  return dispatch => {
    dispatch(initialRequest());
    api.getForm((err, body) => {
      dispatch(fillState(body));
    });
  };
}
