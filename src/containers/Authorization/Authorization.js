import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectReduxForm } from 'redux-form';
import { Link } from 'react-router';
import { login } from '../../redux/actions/auth';

import { Input, SubmitButton, FormHeader } from '../../components';
import {authorization as validation} from '../../utils/validation';

let Authorization = React.createClass({
  propTypes: {
    loggedIn: PropTypes.bool.isRequired,
    loginError: PropTypes.string,
    loggingIn: PropTypes.bool,
    userEmail: PropTypes.string,
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  },
  handleSubmit(event) {
    const { dispatch, fields: { email, password } } = this.props;
    event.preventDefault();
    dispatch(login(email.value, password.value));
  },
  render() {
    const {
      fields: { email, password },
      loginError,
      loggingIn,
      loggedIn,
      userEmail,
    } = this.props;
    return (
      <div className="wide-block">
        <div className="container container-1">
            {loggedIn ? `Hello, ${userEmail}!` :
            <div className="login-block">
                <FormHeader />
                <form className="common-form login-form" onSubmit={this.handleSubmit}>
                  {
                    loginError ?
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
                      handleSubmit={this.handleSubmit}
                      pending={loggingIn ? true : false}
                      text="Sign In"
                    />
                  </div>
                  <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
                </form>
            </div>
            }
          </div>
      </div>
      );
  }
});

Authorization = connectReduxForm({
  form: 'authorization',
  fields: ['email', 'password'],
  validate: validation,
})(Authorization);

function mapStateToProps(state) {
  return {
    loginError: state.auth.get('loginError'),
    loggingIn: state.auth.get('loggingIn'),
    loggedIn: state.auth.get('loggedIn'),
    userEmail: state.auth.getIn(['user', 'email']),
    form: state.auth,
  };
}

export default connect(mapStateToProps)(Authorization);
