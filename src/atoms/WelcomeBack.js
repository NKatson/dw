import React, { PropTypes } from 'react'

class WelcomeBack extends React.Component {
  render() {
    const { firstName, handleClose } = this.props;
    return (
      <div className="wfm-message">
        <a onClick={handleClose} href="#" className="wfm-message__close">&times;</a>
        <h2>WELCOME BACK MARY!</h2>
        We’re happy to see you. Let’s continue to set up your WorthFM account.
    </div>
    );
  }
}

WelcomeBack.propTypes = {
  firstName: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default WelcomeBack;
