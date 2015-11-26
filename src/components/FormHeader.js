import React, { PropTypes } from 'react'

class FormHeader extends React.Component {

  render() {
    const logoImage = require('./logo-big.png');
    return (
      <div>
        <img src={logoImage} />
          <div className="login-block__site-title">Worth.fm</div>
          <div className="login-block__site-descr">Invest in possibility.</div>
      </div>
    );
  }
}

export default FormHeader;
