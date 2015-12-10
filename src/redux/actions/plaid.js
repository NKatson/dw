export const SET_BANKS  = 'SET_BANKS';
export const SEARCH_BANKS = 'SEARCH_BANKS';

export function setBanks(data, cb) {
  console.log('action...');
  return {
    type: SET_BANKS,
    banks: data,
  }
}

export function searchBanks(value) {
  return {
    type: SEARCH_BANKS,
    value,
  }
}
