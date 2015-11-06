import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {connectReduxForm} from 'redux-form';
import {Link} from 'react-router';
import {login} from '../../redux/actions/auth';

import { Input, SubmitButton, FormHeader } from '../../components';
import {authorization as validation} from '../validation';

class Authorization extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const {email, password} = this.props.fields;
    this.props.dispatch(login(email.value, password.value));
  }
  render() {
    const {
      fields: { email, password },
      loginError,
      loggingIn,
      loggedIn,
      user,
    } = this.props;
    return (
      <div className="container container-1">
          {loggedIn ? `Hello, ${user.username}!` :
          <div className="login-block">
              <FormHeader />
              <form className="common-form login-form" onSubmit={this.handleSubmit.bind(this)}>
                {
                  loginError && loginError.length > 0 ?
                  <div className="message message_error">{loginError}</div> :
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
                  <SubmitButton
                    fields={this.props.fields}
                    handleSubmit={::this.handleSubmit}
                    pending={loggingIn}
                    text="Sign In"
                  />
                </div>
                <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
              </form>
          </div>
          }
        </div>
      );
  }
}

Authorization.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  loginError: PropTypes.string,
  loggingIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  fields: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

Authorization = connectReduxForm({
  form: 'authorization',
  fields: ['email', 'password'],
  validate: validation,
})(Authorization);

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    loggingIn: state.auth.loggingIn,
    loggedIn: state.auth.loggedIn,
    user: state.auth.user,
    form: state.auth,
  };
}

export default connect(mapStateToProps)(Authorization);
