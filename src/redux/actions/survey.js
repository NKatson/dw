import * as api from '../../utils/apiClient';

export const INITIAL_REQUEST      = 'INITIAL_REQUEST';
export const FILL_STATE           = 'FILL_STATE';
export const TOGGLE_SSN           = 'TOGGLE_SSN';
export const SELECT_CHANGE        = 'SELECT_CHANGE';
export const SUBMIT_NEXT          = 'SUBMIT_NEXT';
export const ACCOUNT_TYPE_CHANGED = 'ACCOUNT_TYPE_CHANGED';
export const CHANGE_QUESTION      = 'CHANGE_QUESTION';
export const SEND_DATA            = 'SEND_DATA';
export const DISABLE_NEXT         = 'DISABLE_NEXT';
export const ENABLE_NEXT          = 'ENABLE_NEXT';
export const SAVE_WELCOME         = 'SAVE_WELCOME';
export const SSN_CHANGE           = 'SSN_CHANGE';
export const SSN_ERROR_CHANGE     = 'SSN_ERROR_CHANGE';
export const RADIO_CLICKED        = 'RADIO_CLICKED';
export const SHOW_WELCOME_BACK    = 'SHOW_WELCOME_BACK';

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

function sendData(data) {
  return {
    type: SEND_DATA,
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

export function toggleSsn() {
  return {
    type: TOGGLE_SSN
  }
}

export function saveWelcome(welcome) {
  return {
    type: SAVE_WELCOME,
    welcome,
  }
}

export function ssnChange(ssn) {
  return {
    type: SSN_CHANGE,
    ssn,
  }
}

export function ssnErrorChange(error) {
  return {
    type: SSN_ERROR_CHANGE,
    error,
  }
}

export function radioClick(name, value) {
  return {
    type: RADIO_CLICKED,
    name,
    value,
  }
}

export function showWelcomeBack() {
  return {
    type: SHOW_WELCOME_BACK
  }
}

export function getData(cb) {
  return dispatch => {
    dispatch(initialRequest());
    api.getForm((err, body) => {
      if (err) return cb();
      dispatch(fillState(body));
    });
  };
}
