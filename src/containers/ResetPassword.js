import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { registration as validate } from '../utils/validation';
import { InputText } from '../atoms';
import { SubmitButton, ResetPasswordSent, LogoForm } from '../components';
import { reset } from '../redux/actions/resetPassword';

class ResetPassword extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.props.fields;
    this.props.dispatch(reset(email.value));
  }
  render() {
    const {
      fields: { email },
      sent,
      resetError,
      resetting,
    } = this.props;
    const sentMessage = "We have sent an email to reset your password to: " + email.value;
    const small = 'Please check your inbox to continue.';
    return (
      <div>
        { sent ?
          <LogoForm
            error={sentMessage}
            small={small}
            handleSubmit={::this.handleSubmit} />
           :
          <LogoForm error={resetError} handleSubmit={::this.handleSubmit}>
            <InputText
                inputClass="full-width"
                errorMessageClass="login-form__error-msg"
                field={email}
                placeholder="Email address"
                type="email"
              />
            <div className="input-wrap">
              <SubmitButton
                fields={this.props.fields}
                handleSubmit={::this.handleSubmit}
                pending={resetting ? true : false}
                text="Send"
              />
            </div>
            <div className="login-form__get-an-account">Already have an account? <Link to="signin">Sign in</Link>.</div>
          </LogoForm>
       }
      </div>
  );
  }
}

ResetPassword.propTypes = {
  resetError: PropTypes.string,
  sent: PropTypes.bool.isRequired,
  resetting: PropTypes.bool,
  fields: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    resetting: state.resetPassword.get('resetting'),
    sent: state.resetPassword.get('sent'),
    resetError: state.resetPassword.get('resetError'),
    form: state.auth,
  };
}

export default reduxForm({
  form: 'resetPassword',
  fields: ['email'],
  validate,
}, mapStateToProps)(ResetPassword);
