import React, { PropTypes } from 'react';

class LogoForm extends React.Component {
  render() {
    const { error, handleSubmit, headerText } = this.props;
    return (
          <div className="login-block">
              <div>
                <img src={require('./logo-big.png')} />
                  <div className="login-block__site-title">Worth.fm</div>
                  <div className="login-block__site-descr">Invest in possibility.</div>
              </div>
              {headerText ? <h2>{headerText}</h2> : null}
              <form className="common-form login-form" onSubmit={handleSubmit}>
                {
                  error ?
                  <div className="message message_error">{error}</div> :
                  null
                }
                {this.props.children}
              </form>
          </div>
      );
  }
}

export default LogoForm;
