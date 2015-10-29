import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {connectReduxForm, reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {login} from '../../redux/actions/auth';

import {Input} from '../../components';
import {authorization as validation} from '../validation';

class Authorization extends React.Component {
  formIsValid() {
    const fields = this.props.fields;
    const formValid = Object.keys(fields).reduce((prev, cur) => {
      let error = fields[cur].error ? 0 : 1;
      let value = fields[cur].value && fields[cur].value.length > 0 ? 1 : 0;

      return prev * error * value;
    }, 1);

    return formValid;
  }
  handleSubmit(event) {
    event.preventDefault();
    const {email, password} = this.props.fields;
    this.props.dispatch(login(email.value, password.value));
  }
  render() {
    const {
      fields: { email, password },
    } = this.props;
    return (
      <div className="container container-1">
            <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt="" />
                <div className="login-block__site-title">Worth.fm</div>
                <div className="login-block__site-descr">Invest in possibility.</div>
                <form className="common-form login-form" onSubmit={this.handleSubmit.bind(this)}>
                  {
                    this.props.loginError ?
                    <div className="message message_error">{this.props.loginError}</div> :
                    null
                  }
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
                  <div className="pad-01 text-right"><a href="#">Forgot password?</a></div>
                  <div className="input-wrap">
                      <button
                        className="btn btn_blue w-308"
                        disabled={::this.formIsValid() ? false : true}
                        onClick={this.handleSubmit.bind(this)}
                        type="submit"
                        >Sign In</button>
                  </div>
                  <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
                </form>
            </div>
        </div>
      );
  }
}

Authorization.propTypes = {
  fields: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loginError: PropTypes.string,
  user: PropTypes.object.isRequired,
  loggedIn: PropTypes.boolean,
};

Authorization = connectReduxForm({
  form: 'authorization',
  fields: ['email', 'password'],
  validate: validation,
})(Authorization);

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
    loggedIn: state.auth.loggedIn,
    user: state.auth,
    form: state.auth,
  };
}

export default connect(mapStateToProps)(Authorization);
