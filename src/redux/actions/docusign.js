import * as api from '../../utils/apiClient';

export const SET_LINK         = 'SET_LINK';

export function setLink(link) {
  return {
    type: SET_LINK,
    link,
  }
}
