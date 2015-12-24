import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { confirmEmail } from '../redux/actions/auth';

class ConfirmEmail extends React.Component {
  redirect() {
    const { category, step } = this.props;

    let link = '/welcome';
    if (category && typeof step !== 'undefined') {
      link =  `/survey/${category.toLowerCase()}/q/${step}`;
    }
    this.context.history.push( link);
  }
  componentDidMount() {
    const { location: { query: { confirmation_token } }, dispatch, confirmingToken, category, step } = this.props;
    if (confirmation_token) {
      if (confirmingToken) return;
      dispatch(confirmEmail(confirmation_token, (err) => {
        // error or redirect
        if (err) {
          return this.context.history.push( '/signin');
        }
        // success
        ::this.redirect();
      }));
    } else {
      this.context.history.push( '/signin');
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
      category: state.survey.get('category'),
      step: state.survey.get('step'),
  };
}

export default connect(mapStateToProps)(ConfirmEmail);
