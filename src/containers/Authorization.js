import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link, History, PropTypes as RouterPropTypes } from 'react-router';
import { login } from '../redux/actions/auth';
import { InputText } from '../atoms';
import { SubmitButton, FormHeader, LogoForm } from '../components';
import { authorization as validate } from '../utils/validation';

export class Authorization extends React.Component {
  handleSubmit(event) {
    const { dispatch, fields: { email, password } } = this.props;
    event.preventDefault();
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
      <div className="wide-block">
        <div className="container container-1">
            {loggedIn ? `Hello, ${userEmail}!` :
            <LogoForm error={loginError} handleSubmit={::this.handleSubmit}>
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
              <div className="pad-01 text-right"><a href="#">Forgot password?</a></div>
              <div className="input-wrap">
                <SubmitButton
                  fields={this.props.fields}
                  handleSubmit={::this.handleSubmit}
                  pending={loggingIn ? true : false}
                  text="Sign In"
                />
              </div>
              <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
            </LogoForm>
            }
          </div>
      </div>
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
