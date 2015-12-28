import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default ({ reconnect }) => {
  return (
    <div>
      <div className="wfm-vcentered-block wfm-vcentered-block_mini">
          <h2>OH NO!</h2>
          <p>Sorry we were unable to connect to your bank.</p>
      </div>
      <p>Here are other options to fund your account:</p>
      <div className="wfm-biglinks-list">
          <Link onClick={reconnect} to="/survey/banks">Connect to your bank</Link>
          <Link to="/survey/check">Enter your bank information</Link>
          <Link to="/survey/mail">Send a check</Link>
          <Link to="/survey/transfer">Wire funds</Link>
      </div>
    </div>
  );
}
