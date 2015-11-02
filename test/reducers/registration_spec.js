import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import * as actions from '../../src/redux/actions/registration';
import reducer from '../../src/redux/reducers/registration';


describe('Registration reducer', () => {

  it('handles REGISTRATION_REQUEST', () => {
    const initialState = Map({});
    const action = {
      type: actions.REGISTRATION_REQUEST,
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      registeringIn: true,
    }));
  });

  it('handles REGISTRATION_FAILURE', () => {
    const initialState = Map();
    const error = 'Some error occured.';
    const action = {
      type: actions.REGISTRATION_FAILURE,
      error,
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      registeringIn: false,
      registrationError: action.error,
    }));
  });

  it('handles REGISTRATION_SUCCESS', () => {
    const initialState = Map({
      registeringIn: false,
      registrationError: 'Some error occured.',
    });
    const action = {
      type: actions.REGISTRATION_SUCCESS,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(Map());
  });
});
