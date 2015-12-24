import * as api from '../../utils/apiClient';

export const SET_BANKS  = 'SET_BANKS';
export const SEARCH_BANKS = 'SEARCH_BANKS';
export const SET_ACCOUNTS = 'SET_ACCOUNTS';
export const EXIT         = 'EXIT';
export const RESET_ERROR  = 'RESET_ERROR';

export function setBanks(data, cb) {
  return {
    type: SET_BANKS,
    banks: data,
  }
}

export function setAccounts(accounts) {
  return {
    type: SET_ACCOUNTS,
    accounts,
  }
}

export function exit() {
  return {
    type: EXIT
  }
}

export function reset() {
  return {
    type: RESET_ERROR
  }
}

export function searchBanks(value) {
  return {
    type: SEARCH_BANKS,
    value,
  }
}

export function saveBanks(data, cb) {
  return dispatch => {
    dispatch(setBanks(data)).then(() => {
      cb();
    })
  }
}

export function auth(publicToken, cb) {
  return dispatch => {
    api.plaidAuth(publicToken, (err, data) => {
        if (err) return cb(err);
        dispatch(setAccounts(data.accounts)).then(() => {
          return cb(null);
        });
    });
  }
}
