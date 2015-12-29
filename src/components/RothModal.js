import React, { PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { RadioGroup, Radio } from 'react-icheck';

import { RothStepsModal } from '../components';
import { Checkbox, ModalButton } from '../atoms';
import { resetAccount, resetCheckbox, hideModal, buttonClick, changeAccount } from '../redux/actions/bundle';

class RothModal extends React.Component {
  resetCheckbox(e) {
    this.props.dispatch(resetCheckbox(e.target.value));
  }
  resetAccount() {
    if (this.props.resetValue === 'yes') {
      return this.props.dispatch(resetAccount());
    }
    this.props.dispatch(hideModal());
  }
  closeButton(e) {
    e.preventDefault();
    this.props.dispatch(hideModal());
  }
  handleButtonClick() {
    const { step, income, dispatch, employeeIncome, header, success } = this.props;
    // change accountType and close
    if (success === true) {
      this.props.dispatch(changeAccount());
    }

    // next step
    if (typeof success !== 'boolean') {
      return this.props.dispatch(buttonClick(employeeIncome));
    }

    // reset state to initial
    if (success === false) {
      this.props.dispatch(resetAccount());
    }

    this.props.dispatch(hideModal());
  }
  render() {
    const { showModal, accountType, resetValue, success, step, joint, income } = this.props;

    let buttonText = 'Continue';
    if (typeof success === 'boolean') {
      buttonText = success ? 'Yes, continue' : 'Close';
    }

    return (
      <Modal show={showModal}
        btnClass="btn btn_yellow btn_blue-text"
        className="modal fade wfm-common-modal modal-roth-ira">
        <Modal.Header closeButton={true} onHide={::this.closeButton} bsClass="t" />
        {
          accountType === 'traditional'
          ? <RothStepsModal {...this.props}>
              <ModalButton
                  handleClick={::this.handleButtonClick}
                  additionalClass={(!step && !joint ? 'disabled' : '') + (step === 1 && joint === 'yes' && !income ? 'disabled' : '')}
                  text={buttonText}
              />
          </RothStepsModal>
          : <Modal.Body>
              <form className="common-form text-center">
                  <div>
                    <p>Are you sure you want to set up a Tradidional account instead?</p> <br />
                      <RadioGroup name="reset">
                          <Radio
                            id="reset-yes"
                            onClick={::this.resetCheckbox}
                            radioClass="iradio_minimal"
                            increaseArea="20%"
                            value="yes"
                            label="<label style='padding-right: 20px' for='reset-yes'>Yes</label>"
                          />
                          <Radio
                            id="reset-no"
                            onClick={::this.resetCheckbox}
                            radioClass="iradio_minimal"
                            increaseArea="20%"
                            value="no"
                            label="<label style='padding-right: 20px' for='reset-no'>No</label>"
                          />
                      </RadioGroup>
                    <ModalButton
                        handleClick={::this.resetAccount}
                        additionalClass={!resetValue ? 'disabled' : ''}
                        text='Continue'
                        />
                  </div>
              </form>
            </Modal.Body>
        }
      </Modal>
    );
  }
}

export default RothModal;
