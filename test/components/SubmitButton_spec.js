import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import {SubmitButton} from '../../src/components';

const {renderIntoDocument} = ReactTestUtils;

describe('SubmitButton component', () => {
  it('renders correctly.', () => {
    function handleSubmit() {};
    const component = renderIntoDocument(
      <SubmitButton
        fields={{
          error: null,
          touched: false
        }, {
          password: '123',
          touched: true,
        }}
        handleSubmit={function() {}}
        pending={false}
        text="Sign In"
      />
    );
  });
});
