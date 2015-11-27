import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { InputText } from '../atoms';
import { SubmitButton, LogoForm } from '../components';
import { confirmPassword as validate } from '../utils/validation';
import { confirm } from '../redux/actions/resetPassword';

class ConfirmPasswordForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, fields: { password, confirmPassword } } = this.props;
    dispatch(confirm(password, confirmPassword));
  }
  render() {
    const { fields: { password, confirmPassword },
            successMessage,
            confirmError,
            resetting
          } = this.props;
    return (
      <div className="wide-block">
        <div className="container container-1">
            <LogoForm handleSubmit={::this.handleSubmit}
                      error={confirmError}
                      headerText={successMessage ? successMessage : "Reset your password"}>
              {
                successMessage ? null :
                <div>
                  <InputText
                      field={password}
                      icon="glyphicon-lock"
                      placeholder="Password"
                      type="password"
                    />
                  <InputText
                      field={confirmPassword}
                      icon="glyphicon-lock"
                      placeholder="Confirm Password"
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
    resetting: resetPassword.get('resetting'),
    confirmError: resetPassword.get('confirmError'),
    successMessage: resetPassword.get('message'),
    form: state.auth,
  };
}

export default reduxForm({
  form: 'confirmPassword',
  fields: ['password', 'confirmPassword'],
  validate,
}, mapStateToProps)(ConfirmPasswordForm);
