import React, {PropTypes} from 'react';
import {connectReduxForm} from 'redux-form';
import {Link} from 'react-router';

@connectReduxForm({
  form: 'authorization',
  fields: ['email', 'password'],
})
export default class Authorization extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };
  render() {
    const {
      fields: { email, password },
      handleSubmit,
    } = this.props;
    const renderInput = ({ field, placeholder, icon, type = 'text' }) =>
      <div className={'input-wrap input-wrap_with-icon' + (field.error && field.touched ? ' input-wrap_error' : '')}>
          <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div>
          <input type={type} className="text full-width" placeholder={placeholder} {...field} />
      </div>;
    return (
      <div className="container container-1">
            <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt=""/>
                <div className="login-block__site-title">Worth.fm</div>
                <div className="login-block__site-descr">Invest in possibility.</div>
                <form className="common-form login-form" onSubmit={handleSubmit}>
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
                    <div className="pad-01 text-right"><a href="#">Forgot password?</a></div>
                    <div className="input-wrap">
                        <button className="btn btn_blue w-308" trype="submit">Sign In</button>
                    </div>
                    <div>Don’t have an account? <Link to="/signup">Get One.</Link></div>
                </form>
            </div>
        </div>
    );
  }
}
