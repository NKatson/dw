import React, { PropTypes } from 'react';

class LogoForm extends React.Component {
  render() {
    const { error, handleSubmit, small, headerText } = this.props;
    return (
      <form className="common-form login-form" onSubmit={handleSubmit}>
          <div className="wfm-logo">
              <div><img src={require('../../static/images/logo-224.png')} /></div>
              <div className="wfm-logo__text">Invest in possibility.</div>
          </div>
          {
            headerText ?
            <p className="login-form__message"><b>{headerText}</b></p>
            : null}
          {
            error ?
            <p className="login-form__message">{error}</p> :
            null
          }
          {
            small ?
            <p className="pad-08">{small}</p> :
            null
          }
          <div className="login-form__fieldset">
            {this.props.children}
          </div>
      </form>
      );
  }
}

LogoForm.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  small: PropTypes.string,
}
export default LogoForm;
