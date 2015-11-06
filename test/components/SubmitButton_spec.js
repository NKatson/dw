import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {expect} from 'chai';

import {SubmitButton} from '../../src/components';

const {renderIntoDocument} = ReactTestUtils;
const defaultFields = [
  {error: null, touched: false},
  {password: 'pass', touched: true},
];

describe('SubmitButton component', () => {
  it('renders correctly.', () => {
    const component = renderIntoDocument(
      <SubmitButton
        fields={defaultFields}
        handleSubmit={function() {}}
        pending={false}
        text="Sign In"
      />
    );
    return expect(component).to.be.ok;
  });

  it('show ajax loader if pending.', () => {
    const component = renderIntoDocument(
      <SubmitButton
        fields={defaultFields}
        handleSubmit={function() {}}
        pending={true}
        text="Sign In"
      />
    );
    const dom = ReactDOM.findDOMNode(component);
    const spinner = dom.getElementsByClassName('spinner')[0];
    return expect(spinner).to.be.ok;

  });
});
