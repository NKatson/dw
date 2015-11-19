import * as api from '../../utils/apiClient';

export const INITIAL_REQUEST = 'INITIAL_REQUEST';
export const FILL_STATE = 'FILL_STATE';
export const TOGGLE_SSN = 'TOGGLE_SSN';
export const SELECT_CHANGE = 'SELECT_CHANGE';
export const SUBMIT_NEXT = 'SUBMIT_NEXT';
export const SHOW_RECOMMEND = 'SHOW_RECOMMEND';
export const NEXT_SELECTED_CLICKED = 'NEXT_SELECTED_CLICKED';
export const PREV_CLICKED = 'PREV_CLICKED';
export const ACCOUNT_TYPE_CHANGED = 'ACCOUNT_TYPE_CHANGED';
export const CHANGE_QUESTION = 'CHANGE_QUESTION';

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

export function submitNext() {
  return {
    type: SUBMIT_NEXT,
  }
}

export function showRecommend() {
  return {
    type: SHOW_RECOMMEND,
  }
}
export function prevClicked() {
  return {
    type: PREV_CLICKED,
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
