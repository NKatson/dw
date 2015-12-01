import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { InputText } from '../atoms';
import { SubmitButton, LogoForm } from '../components';
import { confirmPassword as validate } from '../utils/validation';
import { checkPasswordToken, confirm, setTimer } from '../redux/actions/resetPassword';

class ConfirmPasswordForm extends React.Component {
  componentDidMount() {
    const { location: { query: { password_token } }, dispatch, confirmingToken } = this.props;

    if (password_token) {
      if (confirmingToken) return;
      dispatch(checkPasswordToken(password_token, (err) => {
        if (err) {
          console.log('Error! Redirect...');
          //this.context.history.pushState(null, '/signin');
        }
      }));
    } else {
      this.context.history.pushState(null, '/signin');
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, fields: { password, confirmPassword }, token, client_id, email } = this.props;
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
        setInterval(() => {
          if (timer === -1) return this.context.history.pushState(null, '/welcome');
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
                      headerText={message ? message : "Reset your password"}>
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
    tokenConfirmed : resetPassword.get('tokenConfirmed'),

    token: resetPassword.get('token'),
    client_id: resetPassword.get('client_id'),
    email: resetPassword.get('email'),

    resetting: resetPassword.get('resetting'),

    confirmError: resetPassword.get('confirmError'),
    successMessage: resetPassword.get('message'),
    timer: resetPassword.get('timer'),
    form: state.auth,
  };
}

export default reduxForm({
  form: 'confirmPassword',
  fields: ['password', 'confirmPassword'],
  validate,
}, mapStateToProps, (dispatch) => dispatch)(ConfirmPasswordForm);
