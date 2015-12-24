import React, { PropTypes } from 'react';
import  { Link } from 'react-router';

const Buttons = ({prevLink, nextLink, isDisabled = false, text, nextLinkHandler}) => {
  let pr = {};
  if (nextLinkHandler) {
    pr.onClick = nextLinkHandler;
  }
  return (
    <div className="common-form__buttons">
      {prevLink ? <Link to={prevLink}  className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
      {nextLink ? <Link to={nextLink} {...pr} className="btn btn_yellow" disabled={isDisabled}>{text ? text : 'Next'} <span className="wfm-i wfm-i-arr-right-grey"></span></Link> : null}
    </div>
  );
}

export default Buttons;
