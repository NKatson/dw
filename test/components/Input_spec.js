import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import {Input} from '../../src/components';

const {renderIntoDocument} = ReactTestUtils;

describe('Input component', () => {
  it('renders correctly.', () => {
    const component = renderIntoDocument(
      <Input
        field={{error: null, touched: false}}
        type="text"
        placeholder="Text"
        icon="icon-class"
      />
    );
  });
});
