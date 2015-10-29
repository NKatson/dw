import React, { PropTypes } from 'react';
import {connectReduxForm} from 'redux-form';
import {Link} from 'react-router';

import {Input} from '../../components';
import {authorization as validation} from '../validation';

class Authorization extends React.Component {
  render() {
    const {
      fields: { email, password },
      handleSubmit,
    } = this.props;
    return (
      <div className="container container-1">
            <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt="" />
                <div className="login-block__site-title">Worth.fm</div>
                <div className="login-block__site-descr">Invest in possibility.</div>
                <form className="common-form login-form" onSubmit={handleSubmit}>
                  {
                    this.props.loginError ?
                    <div className="message message_error">{this.props.loginError}</div> :
                    null
                  }
                  <Input
                    field={email}
                    icon="glyphicon-user"
                    placeholder="Email"
                    type="email"
                  />
                  <Input
                    field={password}
                    icon="glyphicon-lock"
                    placeholder="Password"
                    type="password"
                  />
                  <div className="pad-01 text-right"><a href="#">Forgot password?</a></div>
                  <div className="input-wrap">
                      <button
                        className="btn btn_blue w-308"
                        type="submit"
                        onClick={handleSubmit}
                        >Sign In</button>
                  </div>
                  <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
                </form>
            </div>
        </div>
      );
  }
}

Authorization.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

Authorization = connectReduxForm({
  form: 'authorization',
  fields: ['email', 'password'],
  validate: validation,
})(Authorization);

export default Authorization;
