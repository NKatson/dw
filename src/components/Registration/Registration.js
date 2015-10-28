import React, {PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {Link} from 'react-router';
import validation from './validation';

class Registration extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
  formIsValid() {
    const fields = this.props.fields;
    const formValid = Object.keys(fields).reduce((prev, cur) => {
      let error = fields[cur].error ? 0 : 1;
      let touched = fields[cur].touched ? 1 : 0;

      return prev * error * touched;
    }, 1);

    return formValid;
  }
  render() {
    const {
      fields: { email, password, confirmPassword },
      handleSubmit,
    } = this.props;

    const renderInput = ({ field, placeholder, icon, type = 'text' }) =>
      <div className={'input-wrap input-wrap_with-icon' + (field.error && field.touched ? ' input-wrap_error' : '')}>
          <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div>
          <input type={type} className="text full-width" placeholder={placeholder} {...field} />
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
                  {renderInput({
                    field: email,
                    placeholder: 'Email',
                    icon: 'glyphicon-user',
                    type: 'email',
                  })}
                  {renderInput({
                    field: password,
                    placeholder: 'Password',
                    icon: 'glyphicon-lock',
                    type: 'password',
                  })}
                  {renderInput({
                    field: confirmPassword,
                    placeholder: 'Confirm password',
                    icon: 'glyphicon-user',
                    type: 'password',
                  })}
                  <div className="input-wrap">
                      <button
                        className="btn btn_blue w-308"
                        onClick={handleSubmit}
                        disabled={::this.formIsValid() ? false : true}
                      >Sign Up</button>
                  </div>
                  <div>Already have an account? <Link to="/signin">Sign In.</Link></div>
              </form>
          </div>
      </div>
    );
  }
}

Registration = connectReduxForm({
  form: 'registration',
  fields: ['email', 'password', 'confirmPassword'],
  validate: validation,
})(Registration);

export default Registration;
