import React, {PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {Link} from 'react-router';

import {registration as validation} from '../validation';
import {Input} from '../../components';

class Registration extends React.Component {
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
    console.log(email);
    return (
      <div className="container container-1">
          <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt=""/>
              <div className="login-block__site-title">Worth.fm</div>
              <div className="login-block__site-descr">Invest in possibility.</div>
              <form onSubmit={handleSubmit} className="common-form login-form">
                <Input
                  field={email}
                  icon="glyphicon-user"
                  placeholder="Email"
                  type="email"
                />
                <Input
                  field={password}
                  icon="glyphicon-lock"
                  placeholder="Password"
                  type="password"
                />
                <Input
                  field={confirmPassword}
                  icon="glyphicon-lock"
                  placeholder="Confirm password"
                  type="password"
                />
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

Registration.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

Registration = connectReduxForm({
  form: 'registration',
  fields: ['email', 'password', 'confirmPassword'],
  validate: validation,
})(Registration);

export default Registration;
