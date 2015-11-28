import React, { PropTypes } from 'react';

class LogoForm extends React.Component {
  render() {
    const { error, handleSubmit, headerText } = this.props;
    return (
      <form className="login-form" onSubmit={handleSubmit}>
          <div className="wfm-logo">
              <div><img src={require('../../static/images/logo-224.png')} /></div>
              <div className="wfm-logo__text">Invest in possibility.</div>
          </div>
          {headerText ? <h2>{headerText}</h2> : null}
          <div className="login-form__fieldset">
            {
              error ?
              <div className="message message_error">{error}</div> :
              null
            }
            {this.props.children}
          </div>
      </form>
      );
  }
}

export default LogoForm;
