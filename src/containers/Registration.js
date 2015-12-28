import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link, History, PropTypes as RouterPropTypes } from 'react-router';
import { registration } from '../redux/actions/registration';
import { registration as validate } from '../utils/validation';
import { SubmitButton, LogoForm } from '../components';
import { InputText } from '../atoms';

class Registration extends React.Component {
  redirect() {
    let port = window.location.port.length > 0 ? ':' + window.location.port : '';
    window.location.href = `http://${window.location.hostname}${port}/welcome`;
  }
  handleSubmit(event) {
    event.preventDefault();
    const { email, password, confirmPassword, firstName, lastName } = this.props.fields;
    const data = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      password_confirmation: confirmPassword.value,
    };

    this.props.dispatch(registration(data, () => {
      ::this.redirect();
    }));
  }
  showHelp() {
     $(".input-warp-help__text").fadeIn(200);
  }
  hideHelp() {
     $(".input-warp-help__text").fadeOut(200);
  }
  render() {
    const {
      fields: { email, password, confirmPassword, firstName, lastName },
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
            field={firstName}
            placeholder="First name"
          />
          <InputText
            inputClass="full-width"
            errorMessageClass="login-form__error-msg"
            field={lastName}
            placeholder="Last name"
          />
          <InputText
              inputClass="full-width"
              errorMessageClass="login-form__error-msg"
              field={email}
              placeholder="Email address"
              type="email"
            />
          <hr />
          <InputText
              inputClass="full-width"
              errorMessageClass="login-form__error-msg"
              field={password}
              placeholder="Password"
              type="password"
            >
            <div className="input-wrap-help" onMouseOver={::this.showHelp} onMouseLeave={::this.hideHelp}>
              <a tabIndex="-1" href="#" onClick={(e) => e.preventDefault()} className="input-wrap-help__link wfm-help-sign">?</a>
              <div className="input-warp-help__text" >
                  Password must be 8 characters
                  long and contain at least
                  one uppercase letter and
                  at least one number
              </div>
            </div>
          </InputText>
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
  fields: ['email', 'password', 'confirmPassword', 'firstName', 'lastName'],
  validate,
}, mapStateToProps)(Registration);
