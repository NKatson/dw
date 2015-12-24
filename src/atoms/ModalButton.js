import React, { PropTypes } from 'react';

export default ({ text, handleClick, additionalClass, needCaret = true }) => {
    return (
      <div className="wfm-common-modal__buttons">
        <a href="#"
           onClick={handleClick}
           className={'btn btn_yellow btn_blue-text ' + additionalClass}>{text} {needCaret ? <span className="wfm-i wfm-i-arr-right-blue"></span> : null } </a>
      </div>
    );
}
