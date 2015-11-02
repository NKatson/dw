import ReactTestUtils from 'react-addons-test-utils';
import Authorization from '../../src/containers';

const {renderIntoDocument} = ReactTestUtils;

describe('Authorization', () => {
  it('renders authorization form', () => {
    const component = renderIntoDocument(
      <Authorization />
    );
  });
});
