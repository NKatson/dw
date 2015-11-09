import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { connectReduxForm } from 'redux-form';
import { Link } from 'react-router';
import { authorization as validation } from '../validation';
import { Input, SubmitButton } from '../../components';

class ResetPassword extends React.Component {
  handleSubmit() {
    console.log('handle');
  }
  render() {
    const {
      fields: { email },
      loggedIn,
    } = this.props;
    return (
      <div className="container container-1">
        <div className="login-block">
            <div className="text-left">
                <h1>Reset Your Password</h1>
                <p>No problem! To reset your password, please enter the email address associated with your account.</p>
            </div>
            <form action="" className="common-form login-form">
                <Input
                  field={email}
                  icon="glyphicon-user"
                  placeholder="example@website.com"
                  type="email"
                />
                <div className="input-wrap">
                  <SubmitButton
                    fields={this.props.fields}
                    handleSubmit={::this.handleSubmit}
                    pending={false}
                    text="Sign In"
                  />
                </div>
                <div>Already have an account? <Link to="signin">Sign In.</Link></div>
            </form>
        </div>
    </div>
  );
  }
}


ResetPassword.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ResetPassword = connectReduxForm({
  form: 'resetPassword',
  fields: ['email'],
  validate: validation,
})(ResetPassword);

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.get('loggedIn'),
    form: state.auth,
  };
}

export default connect(mapStateToProps)(ResetPassword);
