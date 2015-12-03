import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link, History, PropTypes as RouterPropTypes } from 'react-router';
import { registration } from '../redux/actions/registration';
import { registration as validate } from '../utils/validation';
import { SubmitButton, LogoForm } from '../components';
import { InputText } from '../atoms';

class Registration extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const {email, password, confirmPassword} = this.props.fields;
    const data = {
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };

    this.props.dispatch(registration(data, () => {
      this.context.history.replaceState(null, '/welcome');
    }));
  }
  render() {
    const {
      fields: { email, password, confirmPassword },
      registrationError,
      loggedIn,
      registeringIn,
      userEmail,
    } = this.props;
    return (
      <LogoForm error={registrationError} handleSubmit={::this.handleSubmit}>
          <InputText
              inputClass="full-width"
              errorMessageClass="login-form__error-msg"
              field={email}
              placeholder="Email address"
              type="email"
            />
          <InputText
              inputClass="full-width"
              errorMessageClass="login-form__error-msg"
              field={password}
              placeholder="Password"
              type="password"
            />
          <InputText
              inputClass="full-width"
              errorMessageClass="login-form__error-msg"
              field={confirmPassword}
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
          <div className="login-form__get-an-account">Already have an account? <Link to="signin">Sign In</Link>.</div>
        </LogoForm>
    );
  }
};

Registration.propTypes = {
    registrationError: PropTypes.string,
    registeredIn: PropTypes.bool,
    registeringIn: PropTypes.bool,
    fields: PropTypes.object.isRequired,
    userEmail: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
};

Registration.contextTypes = {
  history: RouterPropTypes.history,
};

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
