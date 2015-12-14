import * as actions from '../actions/plaid';
import { Map, fromJS } from 'immutable';

const initialState = {
  banks: [],
  searchBanks: [],
  accounts: [],
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SET_ACCOUNTS:
      return Object.assign({}, state, { accounts: action.accounts });
    case actions.SET_BANKS:
      return Object.assign({}, state, {banks: action.banks});
    case actions.SEARCH_BANKS:
      let b = [];
      if (action.value && action.value.length > 0) {
        b = state.banks.filter(bank => {
          return bank.name.toLowerCase().includes(action.value.toLowerCase());
        });
      }
      return Object.assign({}, state, {searchBanks: b});
    default:
      return state;
    }
}
