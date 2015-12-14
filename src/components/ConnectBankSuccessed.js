import React, { PropTypes } from 'react';

class ConnectBankSuccessed extends React.Component {
  render() {
    return (
      <div>
        <h2>3. CONNECT YOUR BANK</h2>
          <p>Your bank account has been successfully linked!</p>
          <form className="common-form anketa-form">
              <div className="anketa-form__fieldset anketa-form__main-fieldset">
                  <div className="input-wrap">
                      <div className="input-wrap__text">How much do you want to start your WorthFM account with?</div>
                      <input type="text" className="input-text w-330" placeholder="$" />
                  </div>
              </div>
              <p>We will fund your WorthFM account from your bank:</p>
              <div className="wfm-from-your-bank">
                  <div className="wfm-from-your-bank__bank-title">Wells Fargo Checking Account</div>
                  <div className="wfm-from-your-bank__sum">$6,000</div>
              </div>
              <div className="text-center">
                {this.props.childen}
              </div>
          </form>
      </div>
    );
  }
}

export default ConnectBankSuccessed;
