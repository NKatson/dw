import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { RadioGroup, Radio } from 'react-icheck';

import { CurrencyInput } from '../components';
import { Checkbox, Radio as _radio, ModalButton } from '../atoms';
import { joint, updateIncome, hideModal, resetAccount } from '../redux/actions/bundle';

class RothStepsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iraDescrClass: '',
    };
  }
  handleRadioClick(e) {
    this.props.dispatch(joint(e.target.value));
  }
  toggleIraDescr() {
    $('#iraDescr').slideToggle(200);
    const iraDescrClass = this.state.iraDescrClass.length > 0 ? '' : 'opened';
    this.setState({
      iraDescrClass,
    });
  }
  reject(e) {
    e.preventDefault();
    this.props.dispatch(resetAccount());
    this.props.dispatch(hideModal());
  }
  updateIncome(e) {
    this.props.dispatch(updateIncome(e.target.value));
  }
  render() {
    const { success, header, question, step, joint, income, children } = this.props;
    return (
      <Modal.Body>
        <h2>INTERESTED IN ROTH IRA?</h2>
        { header ? <p>{header}</p> : null }
        { question ? <p>{question}</p> : null }
        {
           success === false ?
          <p className="pad-12">We will prepare a Traditional IRA for you, which you can turn-on from your WorthFM dashboard.</p>
          : null
        }
        <form className="common-form text-center">
            {
              !step ?
              <div>
                <br />
                <p>Do you fill taxes jointly?</p>
                <RadioGroup name="joint">
                    <Radio
                      id='rad-1'
                      onClick={::this.handleRadioClick}
                      radioClass="iradio_minimal"
                      increaseArea="20%"
                      value="yes"
                      label="<label style='padding-right: 20px' for='rad-1'>Yes</label>"
                    />
                    <Radio
                      id='rad-2'
                      onClick={::this.handleRadioClick}
                      radioClass="iradio_minimal"
                      increaseArea="20%"
                      value="no"
                      label="<label style='padding-right: 20px' for='rad-2'>No</label>"
                    />
                </RadioGroup>
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
               success ?
                  <p className="text-center">Would you like us to set one up as part of your WorthFM account?</p>
              : null
            }

            {/* Button */}
            { children }
        </form>

        { success ?
          <p className="text-center pad-20"><a onClick={::this.reject} href="#">I WANT A TRADITIONAL IRA <span className="wfm-i wfm-i-arr-right-yellow"></span></a></p>
        : null}

        { step ? null :
          <div>
            <p className="text-center pad-19"><a href="#" onClick={::this.toggleIraDescr}  className={'wfm-link-with-descr ' + (this.state.iraDescrClass)}>What is a Roth IRA?</a></p>
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
    );
  }
}

export default RothStepsModal;
