import * as api from '../../utils/apiClient';

export const SET_LINK = 'SET_LINK';
export const SET_IS_DOCUSIGN = 'SET_IS_DOCUSIGN';
export const SET_ERROR = 'SET_ERROR';

export function setLink(link) {
  return {
    type: SET_LINK,
    link,
  }
}

export function setIsDocusign(value) {
  return {
    type: SET_IS_DOCUSIGN,
    value,
  }
}

export function setError(error) {
  return {
    type: SET_ERROR,
    error,
  }
}
