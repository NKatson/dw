import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { checkToken } from '../utils/apiClient';


class ConfirmRegistration extends React.Component {
  componentDidMount() {
    const { query: { confirmation_token } } = this.props.location;

    if (confirmation_token) {
      checkToken(confirmation_token, (err) => {
        // 404 error or redirect
        if (err) return this.context.history.pushState(null, '/signin');
        // success
        this.context.history.pushState(null, '/welcome');
      });
    } else {
      this.context.history.pushState(null, '/signin');
    }
  }
  render() {
    return <div></div>;
  }
}

ConfirmRegistration.contextTypes = {
  history: RouterPropTypes.history,
};


function mapStateToProps(state) {
  const { resetPassword } = state;
  return {
    resetting: resetPassword.get('resetting'),
  };
}

export default connect(mapStateToProps)(ConfirmRegistration);
