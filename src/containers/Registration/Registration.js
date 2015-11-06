import React, {PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {registration} from '../../redux/actions/registration';
import {registration as validation} from '../validation';
import {Input} from '../../components';
import {SubmitButton} from '../../components';

export class Registration extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const {email, password, confirmPassword} = this.props.fields;
    const data = {
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    };

    this.props.dispatch(registration(data));
  }
  render() {
    const {
      fields: { email, password, confirmPassword },
      registrationError,
      loggedIn,
      registeringIn,
      username,
    } = this.props;
    return (
      <div className="container container-1">
          {loggedIn ? `Hello, ${username}!` :
          <div className="login-block">
            <img src={__CLIENT__ ? require('../../public/images/logo-big.png') : ''} alt="" />
              <div className="login-block__site-title">Worth.fm</div>
              <div className="login-block__site-descr">Invest in possibility.</div>
              <form onSubmit={::this.handleSubmit} className="common-form login-form">
                {
                  registrationError && registrationError.length > 0 ?
                  <div className="message message_error">{registrationError}</div> :
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
                <Input
                  field={confirmPassword}
                  icon="glyphicon-lock"
                  placeholder="Confirm password"
                  type="password"
                />
                  <div className="input-wrap">
                    <SubmitButton
                      fields={this.props.fields}
                      handleSubmit={::this.handleSubmit}
                      pending={registeringIn ? true : false}
                      text="Sign Up"
                    />
                  </div>
                  <div>Already have an account? <Link to="/signin">Sign In.</Link></div>
              </form>
          </div>
          }
      </div>
    );
  }
}

Registration.propTypes = {
  registrationError: PropTypes.string,
  registeredIn: PropTypes.bool,
  registeringIn: PropTypes.bool,
  username: PropTypes.string,
  fields: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

Registration = connectReduxForm({
  form: 'registration',
  fields: ['email', 'password', 'confirmPassword'],
  validate: validation,
})(Registration);

function mapStateToProps(state) {
  return {
    registrationError: state.registration.get('registrationError'),
    loggedIn: state.auth.get('loggedIn'),
    registeringIn: state.registration.get('registeringIn'),
    username: state.auth.getIn(['user', 'username']),
    form: state.registration,
  };
}

export default connect(mapStateToProps)(Registration);
