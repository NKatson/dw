import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { confirmEmail } from '../redux/actions/auth';

class ConfirmEmail extends React.Component {
  componentDidMount() {
    const { location: { query: { confirmation_token } }, dispatch, confirmingToken } = this.props;
    console.log(confirmation_token);
    console.log(confirmingToken);
    if (confirmation_token) {
      if (confirmingToken) return;
      dispatch(confirmEmail(confirmation_token, (err) => {
        // error or redirect
        if (err) {
          return this.context.history.pushState(null, '/signin');
        }
        // success
        this.context.history.pushState(null, '/welcome');
      }));
    } else {
      this.context.history.pushState(null, '/signin');
    }
  }
  render() {
    return <div>Confirm email</div>;
  }
}

ConfirmEmail.contextTypes = {
  history: RouterPropTypes.history,
};

ConfirmEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  confirmingToken: PropTypes.bool,
  confirmTokenError: PropTypes.string,
}

function mapStateToProps(state) {
  const { resetPassword } = state;
  return {
      confirmingToken: resetPassword.get('confirmingToken'),
      confirmTokenError: resetPassword.get('confirmTokenError'),
  };
}

export default connect(mapStateToProps)(ConfirmEmail);
