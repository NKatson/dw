import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Authorization extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }
  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.email;
    const password = this.refs.password;
    // this.props.login(input.value, password.value);
    input.value = '';
    password.value = '';
  }
  render() {
    return (
      <div className="container container-1">
            <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt=""/>
                <div className="login-block__site-title">Worth.fm</div>
                <div className="login-block__site-descr">Invest in possibility.</div>
                <form className="common-form login-form" onSubmit={::this.handleSubmit}>
                  <div className={'input-wrap input-wrap_with-icon'}>
                      <div className="input-wrap__icon"><span aria-hidden="true" className="glyphicon glyphicon-user"></span></div>
                      <input ref="email" type="email" className="text full-width" placeholder="Email" />
                  </div>
                  <div className={'input-wrap input-wrap_with-icon'}>
                      <div className="input-wrap__icon"><span aria-hidden="true" className="glyphicon glyphicon-lock"></span></div>
                      <input ref="password" type="password" className="text full-width" placeholder="Password" />
                  </div>
                  <div className="pad-01 text-right"><a href="#">Forgot password?</a></div>
                  <div className="input-wrap">
                      <button className="btn btn_blue w-308" trype="submit">Sign In</button>
                  </div>
                  <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
                </form>
            </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  const {auth} = state;
  if (auth) return {user: auth.user, loginError: auth.loginError};

  return {user: null};
}

export default connect(mapStateToProps)(Authorization);
