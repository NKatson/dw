import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import * as actions from '../../src/redux/actions/auth';
import reducer from '../../src/redux/reducers/auth';


describe('Auth reducer', () => {

  it('handles LOGIN_REQUEST', () => {
    const initialState = Map({});
    const action = {
      type: actions.LOGIN_REQUEST,
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      loggingIn: true,
    }));
  });

  it('handles LOGIN_FAILURE', () => {
    const initialState = Map({
      loggedIn: false,
    });
    const error = 'Some error occured.';
    const action = {
      type: actions.LOGIN_FAILURE,
      error,
    }
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      loggingIn: false,
      loggedIn: false,
      loginError: error,
    }));
  });

  it('handles LOGIN_SUCCESS', () => {
    const initialState = Map({
      loggedIn: false,
    });
    const action = {
      type: actions.LOGIN_SUCCESS,
      user: {
        username: 'Vasya Pupkin',
        email: 'vasya@example.com',
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      loggedIn: true,
      user: {
        username: 'Vasya Pupkin',
        email: 'vasya@example.com',
      },
    }));
  });
});
