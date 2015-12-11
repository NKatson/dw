import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class LogoForm extends React.Component {
  render() {
    const { error, handleSubmit, small, headerText, redirectLink } = this.props;
    return (
      <form className="common-form login-form" onSubmit={handleSubmit}>
          <div className="wfm-logo">
              <div><img src={require('../../static/images/logo-224.png')} /></div>
              <div className="wfm-logo__text">Invest in possibility.</div>
          </div>
           <div className="login-form__message">
             {headerText ? <p><b>{headerText}</b></p> : null}
             {small ? <p>{small}</p> : null}
           </div>
          {
            error ?
            <p className="login-form__message">{error}</p> :
            null
          }
          {
            redirectLink && small ?
            <p className="pad-08"> If nothing happens click on the <Link to={redirectLink}>link</Link></p> :
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
  redirectLink: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  small: PropTypes.string,
}
export default LogoForm;
