import React, {PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { History } from 'react-router';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {registration} from '../redux/actions/registration';
import {registration as validate} from '../utils/validation';
import { SubmitButton } from '../components';
import { InputText } from '../atoms';

let Registration = React.createClass({
  propTypes: {
    registrationError: PropTypes.string,
    registeredIn: PropTypes.bool,
    registeringIn: PropTypes.bool,
    fields: PropTypes.object.isRequired,
    userEmail: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  },
  mixins: [ History ],
  handleSubmit(event) {
    event.preventDefault();
    const {email, password, confirmPassword} = this.props.fields;
    const data = {
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };

    this.props.dispatch(registration(data, () => {
      this.history.replaceState(null, '/welcome');
    }));
  },
  render() {
    const {
      fields: { email, password, confirmPassword },
      registrationError,
      loggedIn,
      registeringIn,
      userEmail,
    } = this.props;
    return (
      <div className="wide-block">
        <div className="container container-1">
            <div className="login-block">
                <form onSubmit={this.handleSubmit} className="common-form login-form">
                    {
                      registrationError && registrationError.length > 0 ?
                      <div className="message message_error">{registrationError}</div> :
                      null
                    }
                    <InputText
                      field={email}
                      icon="glyphicon-user"
                      placeholder="Email"
                      type="email"
                    />
                    <InputText
                      field={password}
                      icon="glyphicon-lock"
                      placeholder="Password"
                      type="password"
                    />
                    <InputText
                      field={confirmPassword}
                      icon="glyphicon-lock"
                      placeholder="Confirm password"
                      type="password"
                    />
                    <div className="input-wrap">
                      <SubmitButton
                        fields={this.props.fields}
                        handleSubmit={this.handleSubmit}
                        pending={registeringIn ? true : false}
                        text="Sign Up"
                      />
                    </div>
                    <div>Already have an account? <Link to="/signin">Sign In.</Link></div>
                </form>
            </div>
        </div>
      </div>
    );
  },
});


function mapStateToProps(state) {
  return {
    registrationError: state.registration.get('registrationError'),
    loggedIn: state.auth.get('loggedIn'),
    registeringIn: state.registration.get('registeringIn'),
    userEmail: state.auth.getIn(['user', 'email']),
    form: state.registration,
  };
}

export default reduxForm({
  form: 'registration',
  fields: ['email', 'password', 'confirmPassword'],
  validate,
}, mapStateToProps)(Registration);
