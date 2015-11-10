import React, { PropTypes } from 'react';
import { SubmitButton } from '../../components';

class Welcome extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="container container-1">
            <div style={{textAlign: 'center', padding: '100px'}}>
              <h2>Tell Us About You</h2>
                <SubmitButton
                  fields={[]}
                  handleSubmit={::this.handleSubmit}
                  pending={false}
                  text="Next"
                />
            </div>
      </div>
    );
  }
}

export default Welcome;
