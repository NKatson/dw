import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import { Checkbox } from '../atoms';
import { CurrencyInput } from '../components';
import { joint, buttonClick, updateIncome } from '../redux/actions/bundle';

class RothModal extends React.Component {
  handleRadioClick(name, value) {
    this.props.dispatch(joint(value));
  }
  handleButtonClick(e) {
    e.preventDefault();
    this.props.dispatch(buttonClick());
  }
  toggleIraDescr() {
    $('#iraDescr').slideToggle(200);
  }
  updateIncome(e) {
    this.props.dispatch(updateIncome(e.target.value));
  }
  render() {
    const { showModal, joint, step, totalIncome, header, question } = this.props;
    let buttonText = 'Continue';
    if (step === 2) {
      buttonText = totalIncome > 183000 ? 'Close' : 'Yes, continue';
    }
    return (
      <Modal show={showModal}
        btnClass="btn btn_yellow btn_blue-text"
        className="modal fade wfm-common-modal modal-roth-ira">
        <Modal.Body>
          <h2>INTERESTED IN ROTH IRA?</h2>
          { header ? <p>{header}</p> : null }
          { question ? <p>{question}</p> : null }
          {
            step === 2 && totalIncome > 183000 ?
            <p className="pad-12">We will prepare a Traditional IRA for you, which you can turn-on from your WorthFM dashboard.</p>
            : null
          }
          <form className="common-form text-center">
              {
                !step ?
                <div>
                  <br />
                  <p>Do you fill taxes jointly?</p>
                  <p>
                      <span className="pad-01">
                        <Checkbox handleCheck={::this.handleRadioClick} value="yes"  name="jointly" type="radio" id="yes" /> <label htmlFor="yes">Yes</label>
                      </span>
                      <span className="pad-01">
                        <Checkbox handleCheck={::this.handleRadioClick} value="no"  name="jointly" type="radio" id="no" /> <label htmlFor="no">No</label>
                      </span>
                  </p>
                </div>
                :  null
              }
              {
                joint && joint === 'yes' && step === 1  ?
                <div>
                  <p>What is your total household income?</p>
                    <div className="input-wrap">
                      <CurrencyInput
                        className="input-text full-width"
                        placeholder="$ Household income"
                        type="text"
                        onKeyUp={::this.updateIncome}
                        />
                  </div>
                </div>
                 : null
              }
              {
                step === 2 && totalIncome <= 183000 ?
                    <p className="text-center">Would you like us to set one up as part of your WorthFM account?</p>
                : null
              }

              <div className="wfm-common-modal__buttons">
                <a href="#"
                   onClick={::this.handleButtonClick}
                   className={'btn btn_yellow btn_blue-text ' +
                     (!step && !joint ? 'disabled' : '') +
                     (step === 1 && !totalIncome ? 'disabled' : '')}>
                   {buttonText} {totalIncome > 183000 ? null : <span className="wfm-i wfm-i-arr-right-blue"></span> } </a>
              </div>
          </form>

          {step === 2 && totalIncome <= 183000 ?
            <p className="text-center pad-20"><a href="#">I WANT A TRADITIONAL IRA <span className="wfm-i wfm-i-arr-right-yellow"></span></a></p>
          : null}

          {step ? null :
            <div>
              <p className="text-center pad-19"><a href="#" onClick={::this.toggleIraDescr}  className="wfm-link-with-descr">What is Roth IRA?</a></p>
              <div id="iraDescr"  className="wfm-link-descr pad-18">A Roth IRA is a type of retirement
                account that allows earnings to grow tax-free.Contributions are made
                 with after-tax dollars, and withdrawals are tax and penalty-free as
                  long as the account has been open for five years and you are over 59 1/2.
                  The amount that you are able contribute is dependent upon your income,
                  age, and tax filling status. Roth IRAs do not require you to start
                  making withdrawals at a certain age and they also allow an individual
                  to make a tax and penalty-free withdrawal up to $10,000 for a first
                  time home purchase.</div>
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

export default RothModal;
