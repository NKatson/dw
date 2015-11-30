import React, { PropTypes } from 'react';

class RecommendBlock extends React.Component {
  render () {
    return (
      <div className="blue-block">
        <h3>YOU SELECTED RETIREMENT ACCOUNT</h3>
        <p className="text-center">Since it looks like you won’t need access to your money before your retirement, we recommend opening a <strong>Retirement Account</strong>. If you want to explore the other account types,
            <a href="#">click here</a>.</p>
    </div>
    );
  }
}

export default RecommendBlock;