import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {Authorization} from '../../src/containers/Authorization/Authorization';
import reducer from '../../src/redux/reducers/auth';

const {renderIntoDocument} = ReactTestUtils;

describe('Authorization component', () => {
  const mockStore = {
    auth: {
      loggedIn: false,
    }
  };

  const store = createStore(reducer);
  const renderer = renderIntoDocument(
    <Provider store={store} key="provider">
      <Authorization />
    </Provider>
  );
  const dom = ReactDOM.findDOMNode(renderer);

  it('should render correctly.', () => {
    return expect(renderer).to.be.ok;
  });

  it('should render with disabled submit button.', () => {
    const button = dom.getElementsByTagName('button')[0].disabled;
    return expect(button).to.equal(true);
  });
});
