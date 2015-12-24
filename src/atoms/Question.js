import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default () => {
  return (
      <a onClick={(e) => e.preventDefault()} href="#" className="wfm-help-link">?</a>
  );
}
