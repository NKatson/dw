import React, { PropTypes } from 'react';

class LogoForm extends React.Component {
  render() {
    const { error, handleSubmit } = this.props;
    return (
      <form className="common-form login-form" onSubmit={handleSubmit}>
          <div className="wfm-logo">
              <div><img src={require('../../static/images/logo-224.png')} /></div>
              <div className="wfm-logo__text">Invest in possibility.</div>
          </div>
          {
            error ?
            <p className="login-form__message">{error}</p> :
            null
          }
          <div className="login-form__fieldset">
            {this.props.children}
          </div>
      </form>
      );
  }
}

export default LogoForm;
