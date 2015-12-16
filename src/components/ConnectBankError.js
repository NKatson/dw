import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default ({ reconnect }) => {
  return (
    <div>
      <div className="wfm-vcentered-block wfm-vcentered-block_mini">
          <h2>OH NO!</h2>
          <p>Sorry we were unable to connect your bank.</p>
      </div>
      <p>Here are another options to fund your account:</p>
      <div className="wfm-biglinks-list">
          <Link onClick={reconnect} to="/survey/fund/q/0">Connect to your bank</Link>
          <Link to="/survey/fund/q/2">Enter your bank information</Link>
          <Link to="/survey/fund/q/4">Send a check</Link>
          <Link to="/survey/fund/q/3">Wire funds</Link>
      </div>
    </div>
  );
}
