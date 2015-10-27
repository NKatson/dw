import React, {PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';

function validateRegistration(data) {
  const errors = {};
  if (!data.email) {
    errors.name = 'Required';
  }
  if (data.password && data.password.length > 50) {
    errors.password = 'Must be fewer than 50 characters';
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (!/\d{3}-\d{3}-\d{4}/.test(data.confirmPassword)) {
    errors.confirmPassword = 'Phone must match the form "999-999-9999"';
  }
  return errors;
}

@connectReduxForm({
  form: 'registration',
  fields: ['email', 'password', 'confirmPassword'],
  validate: validateRegistration,
})
export default class Registration extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
  render() {
    const {
      fields: { email, password, confirmPassword },
      handleSubmit,
    } = this.props;
    const renderInput = (field, placeholder, icon) =>
      <div className={'input-wrap input-wrap_with-icon' + (field.error && field.touched ? ' input-wrap_error' : '')}>
          <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div>
          <input type="text" className="text full-width" placeholder={placeholder} {...field} />
          {
            field.error && field.touched ?
              <div className="input-wrap__error-msg">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                 {field.error}
              </div>
              : null
          }
      </div>;
    return (
      <div className="container container-1">
          <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt=""/>
              <div className="login-block__site-title">Worth.fm</div>
              <div className="login-block__site-descr">Invest in possibility.</div>
              <form onSubmit={handleSubmit} className="common-form login-form">
                  {renderInput(email, 'Email', 'glyphicon-user')}
                  {renderInput(password, 'Password', 'glyphicon-lock')}
                  {renderInput(confirmPassword, 'Confirm password', 'glyphicon-lock')}

                  <div className="input-wrap">
                      <button onClick={handleSubmit} className="btn btn_blue w-308">Sign Up</button>
                  </div>
                  <div>Already have an account? <a href="#">Sign In.</a></div>
              </form>
          </div>
      </div>
    );
  }
}
