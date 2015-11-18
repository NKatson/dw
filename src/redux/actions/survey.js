import * as api from '../../utils/apiClient';

export const INITIAL_REQUEST = 'INITIAL_REQUEST';
export const FILL_STATE = 'FILL_STATE';
export const TOGGLE_SSN = 'TOGGLE_SSN';
export const SELECT_CHANGE = 'SELECT_CHANGE';
export const NEXT_CLICKED = 'NEXT_CLICKED';
export const PREV_CLICKED = 'PREV_CLICKED';

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

export function nextClicked() {
  return {
    type: NEXT_CLICKED,
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
