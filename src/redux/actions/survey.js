import * as api from '../../utils/apiClient';

export const INITIAL_REQUEST = 'INITIAL_REQUEST';

function initialRequest() {
  return {
    type: INITIAL_REQUEST,
  };
}

export function getData() {
  return dispatch => {
    dispatch(initialRequest());
    api.getForm((err, body) => {
      console.log(body);
    });
  };
}
