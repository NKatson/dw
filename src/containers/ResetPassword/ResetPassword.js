import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { authorization as validation } from '../../utils/validation';
import { Input, SubmitButton, ResetPasswordSent } from '../../components';
import { reset } from '../../redux/actions/resetPassword';

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
    return (
      <div>
        { sent ? <ResetPasswordSent /> :
        <div className="container container-1">
          <div className="login-block">
             <div className="text-left">
                 <h1>Reset Your Password</h1>
                 <p>No problem! To reset your password, please enter the email address associated with your account.</p>
             </div>
             <form onSubmit={::this.handleSubmit} className="common-form login-form">
               {
                 resetError ?
                 <div className="message message_error">{resetError}</div> :
                 null
               }
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
                     pending={resetting ? true : false}
                     text="Sign In"
                   />
                 </div>
                 <div>Already have an account? <Link to="signin">Sign In.</Link></div>
             </form>
           </div>
         </div>
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

ResetPassword = reduxForm({
  form: 'resetPassword',
  fields: ['email'],
  validate: validation,
}, mapStateToProps)(ResetPassword);

export default connect(mapStateToProps)(ResetPassword);
