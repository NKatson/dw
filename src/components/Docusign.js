import React, { PropTypes } from 'react'

class Docusign extends React.Component {
  render() {
    return (
      <div>
        <h2>4. SIGN</h2>
        <p>Please review and sign the following:</p>
        <br />
          <div className="anketa-form__fieldset">
            <div className="input-wrap input-wrap_list">
                <span className="common-form__label-title">Standard Account Application</span>
                <span className="common-form__label-text">2 signatures, one for your savings account and one for your investment account</span>
            </div>
            <div className="input-wrap input-wrap_list">
                <span className="common-form__label-title">IRA Application</span>
                <span className="common-form__label-text">1 signature, to open your retirement account</span>
            </div>
            <div className="input-wrap input-wrap_list">
                <span className="common-form__label-title">Move Money</span>
                <span className="common-form__label-text">1 signature to allow TD Bank to electronically move funds to and from your connected bank</span>
            </div>
        </div>
        <div className="wfm-docusign">
            .....DocuSign here.......
        </div>
      </div>
    );
  }
}

export default Docusign;
