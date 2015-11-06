import React, { PropTypes } from 'react'

class FormHeader extends React.Component {
  render() {
    return (
      <div>
        <img src={__CLIENT__ ? require('../../../static/images/logo-big.png') : null} />
          <div className="login-block__site-title">Worth.fm</div>
          <div className="login-block__site-descr">Invest in possibility.</div>
      </div>
    );
  }
}

export default FormHeader;
