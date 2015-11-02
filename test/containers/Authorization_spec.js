import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {Map, fromJS} from 'immutable';

import createStore from '../../src/redux/create';
import conectedAuthorization, {Authorization} from '../../src/containers/Authorization/Authorization';
import reducer from '../../src/redux/reducer';

const {renderIntoDocument} = ReactTestUtils;

describe('Authorization component', () => {
  const store = createStore(reducer);
  const props = {
    loggedIn: false,
    dispatch: function() {},
    fields: {
      email: {
        value: null,
      },
      password: {
        value: null,
      }
    }
  }
  const component = renderIntoDocument(
    <Provider store={store} key="provider">
      <Authorization {...props} />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(component);

  it('renders correctly.', () => {
    return expect(component).to.be.ok;
  });

  it('should initially render with disabled submit button.', () => {
    const button = dom.getElementsByTagName('button')[0].disabled;
    return expect(button).to.equal(true);
  });
});
