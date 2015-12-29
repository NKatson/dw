import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { InputText } from '../atoms';
import { SubmitButton, LogoForm } from '../components';
import { registration as validate } from '../utils/validation';
import { checkPasswordToken, confirm, setTimer } from '../redux/actions/resetPassword';
import { showWelcomeBack } from '../redux/actions/survey';
import * as api from '../utils/apiClient';

class ConfirmPasswordForm extends React.Component {
  redirect() {
    let port = window.location.port.length > 0 ? ':' + window.location.port : '';
    window.location.href = `http://${window.location.hostname}${port}/welcome`;
  }
  componentDidMount() {
    const { location: { query: { password_token } }, dispatch, currentLink } = this.props;

    if (password_token) {
      dispatch(checkPasswordToken(password_token, (err) => {
        // error
        if (err) {
          return this.context.history.push( '/signin');
        }
      }));
    } else {
      // success
      this.context.history.push( currentLink);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, fields: { password, confirmPassword }, currentLink, data: {client_id, token, email}} = this.props;
    const { query: {client_id: client, token: accessToken, uid } } = this.props.location;

    if (client_id && email && token) {
      dispatch(confirm({
        password: password.value,
        confirmPassword: confirmPassword.value,
        client: client_id,
        accessToken: token,
        uid: email,
      }, () => {
        let timer = 5;
        let intervalCount = setInterval(() => {
          if (timer === 0) {
            clearInterval(intervalCount);
            return ::this.redirect();
          }
          this.props.dispatch(setTimer(timer));
          timer--;
        }, 1000);
     }));
    }
  }
  render() {
    const { fields: { password, confirmPassword },
            successMessage,
            confirmError,
            resetting,
            timer
          } = this.props;
    let message = successMessage;

    if (timer) {
       message += `\n You will be redirected in ${timer} seconds`;
    }

    return (
      <div className="wide-block">
        <div className="container container-1">
            <LogoForm handleSubmit={::this.handleSubmit}
                      error={confirmError}
                      small={message ? message : null}
                      redirectLink={this.props.currentLink}
                      headerText={message ? null : "Reset your password"}>
              {
                successMessage ? null :
                <div>
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
                      pending={resetting ? true : false}
                      text="Reset Password"
                    />
                  </div>
                </div>
              }
            </LogoForm>
          </div>
      </div>
      );
  }
}

ConfirmPasswordForm.contextTypes = {
  history: RouterPropTypes.history,
};

ConfirmPasswordForm.propTypes = {
  confirmError: PropTypes.string,
  successMessage: PropTypes.string,
  resetting: PropTypes.bool,
  fields: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { resetPassword } = state;
  return {
    confirmingToken: resetPassword.get('confirmingToken'),
    confirmTokenError: resetPassword.get('confirmTokenError'),
    data: resetPassword.get('data'),
    resetting: resetPassword.get('resetting'),
    confirmError: resetPassword.get('confirmError'),
    successMessage: resetPassword.get('message'),
    timer: resetPassword.get('timer'),

    currentLink: state.survey.get('currentLink'),

    form: state.auth,
  };
}

export default reduxForm({
  form: 'confirmPassword',
  fields: ['password', 'confirmPassword'],
  validate,
}, mapStateToProps, (dispatch) => dispatch)(ConfirmPasswordForm);
