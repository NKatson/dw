import React, { PropTypes } from 'react';

class Check extends React.Component {
  render() {
    return (
      <div>
        <h2>3. ENTER YOUR BANK ACCOUNT INFORMATION</h2>
        <p>To find the correct information, grab one of your checks and look
            at the string of the numbers at the bottom. Please enter them below.</p>

          <form className="common-form anketa-form">
            <div className="anketa-form__fieldset"><img src={require('../../static/images/routing-number.png')} alt="" /></div>
            <div className="anketa-form__fieldset">
                <div className="input-wrap">
                    <div className="input-wrap__text">Enter Your Bank Name</div>
                    <input type="text" className="input-text" />
                </div>
                <div className="input-wrap">
                    <div className="input-wrap__text">Enter Your Routing Number</div>
                    <input type="text" className="input-text" />
                </div>
                <div className="input-wrap">
                    <div className="input-wrap__text">Enter Your Account Number</div>
                    <input type="text" className="input-text" />
                </div>
                <div className="input-wrap">
                    <div className="input-wrap__text">How much do you initially want to fund?</div>
                    <input type="text" className="input-text" />
                </div>
            </div>
            <div className="text-center">
                <div className="common-form__buttons">
                    <a href="#" className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</a>
                    <button className="btn btn_yellow">Next <span className="wfm-i wfm-i-arr-right-grey"></span></button>
                </div>
            </div>
        </form>
      </div>
    );
  }
}

export default Check;
