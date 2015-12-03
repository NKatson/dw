import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link, History, PropTypes as RouterPropTypes } from 'react-router';
import { login } from '../redux/actions/auth';
import { InputText } from '../atoms';
import { SubmitButton, LogoForm } from '../components';
import { registration as validate } from '../utils/validation';

export class Authorization extends React.Component {
  handleSubmit(e) {
    const { dispatch, fields: { email, password } } = this.props;
    e.preventDefault();
    dispatch(login(email.value, password.value, () => {
      this.context.history.replaceState(null, '/welcome');
    }));
  }
  render() {
    const {
      fields: { email, password },
      loginError,
      loggingIn,
      loggedIn,
      userEmail,
    } = this.props;
    return (
        <LogoForm error={loginError} handleSubmit={::this.handleSubmit}>
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
          <div className="login-form__forgot">
             <Link to="reset">Forgot password?</Link>
          </div>
          <div className="input-wrap">
            <SubmitButton
              fields={this.props.fields}
              handleSubmit={::this.handleSubmit}
              pending={loggingIn ? true : false}
              text="Sign In"
            />
          </div>
          <div className="login-form__get-an-account">Don’t have an account? <Link to="signup">Get one</Link>.</div>
        </LogoForm>
      );
  }
};

Authorization.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loginError: PropTypes.string,
    loggingIn: PropTypes.bool,
    userEmail: PropTypes.string,
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

Authorization.contextTypes = {
  history: RouterPropTypes.history,
};

function mapStateToProps(state) {
  return {
    loginError: state.auth.get('loginError'),
    loggingIn: state.auth.get('loggingIn'),
    loggedIn: state.auth.get('loggedIn'),
    userEmail: state.auth.getIn(['user', 'email']),
  };
}

export default reduxForm({
  form: 'authorization',
  fields: ['email', 'password'],
  validate,
}, mapStateToProps)(Authorization);
