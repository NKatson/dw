import React, { PropTypes } from 'react';

const categoryDivider = ({ isPassed }) => {
  return (
    <div className={'wfm-steps__dvdr ' + (isPassed ? 'passed' : '')}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

categoryDivider.propTypes = {
  isPassed: PropTypes.bool.isRequired,
}

export default categoryDivider;