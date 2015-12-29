import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { confirmEmail } from '../redux/actions/auth';
import * as api from '../utils/apiClient';

class ConfirmEmail extends React.Component {
  redirect() {
    let port = window.location.port.length > 0 ? ':' + window.location.port : '';
    window.location.href = `http://${window.location.hostname}${port}/welcome`;
  }
  componentDidMount() {
    const { location: { query: { confirmation_token } }, dispatch } = this.props;
    if (confirmation_token) {
      dispatch(confirmEmail(confirmation_token, (err) => {
        // error or redirect
        if (err) {
          return this.context.history.push( '/signin');
        }
        return ::this.redirect();
      }));
    } else {
      this.context.history.push( '/signin');
    }
  }
  render() {
    return null;
  }
}

ConfirmEmail.contextTypes = {
  history: RouterPropTypes.history,
};

ConfirmEmail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  confirmTokenError: PropTypes.string,
}

function mapStateToProps(state) {
  const { resetPassword } = state;
  return {
      confirmTokenError: resetPassword.get('confirmTokenError'),
      category: state.survey.get('category'),
      step: state.survey.get('step'),
  };
}

export default connect(mapStateToProps)(ConfirmEmail);
