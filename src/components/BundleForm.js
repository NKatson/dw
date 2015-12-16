import React, { PropTypes } from 'react';
import { Checkbox } from '../atoms';
import { RothModal } from '../components';
import { Link } from 'react-router';

class BundleForm extends React.Component {
  showModal(e) {
    e.preventDefault();
    $('#modalRothIRA').modal('show');
  }
  render() {
    const { handleTermsToggle, checked } = this.props;
    return (
      <div>
        <h2>2. LET’S OPEN YOUR WORTHFM ACCOUNT</h2>
        <p>Your WorthFM account bundle contains a Savings, Investing, and Retirement plan that is personalized for you &mdash; leading to simple and balanced financial bliss. </p>
        <div className="wfm-account-plans">
            <div className="wfm-account-plan">
                <div className="wfm-account-plan__pic"><img src={require('../../static/images/plan-savings.jpg')} alt="" /></div>
                <div className="wfm-account-plan__title">Emergency Savings</div>
                <div className="wfm-account-plan__text">
                    Your WorthFM rainy day account is there whenever you need it. FDIC insured to $500,000 at TD Bank.
                </div>
            </div>
            <div className="wfm-account-plan">
                <div className="wfm-account-plan__pic"><img src={require('../../static/images/plan-investing.jpg')} alt="" /></div>
                <div className="wfm-account-plan__title">Investing</div>
                <div className="wfm-account-plan__text">
                    Your WorthFM sunrise account finds thos extra dollars and puts them to work for you. Because life is full of brilliance. Invested at TD Ameritrade.
                </div>
            </div>
            <div className="wfm-account-plan">
                <div className="wfm-account-plan__pic"><img src={require('../../static/images/plan-retirement.jpg')} alt="" /></div>
                <div className="wfm-account-plan__title">Retirement</div>
                <div className="wfm-account-plan__text">
                    Your Worth FM sunset account offers you confidence in a secure future. This account is set up as a {this.props.text} at TD Ameritrade and can be enabled from your WorthFM homepage.
                    <a onClick={::this.showModal} href="#">Want a {this.props.link} instead?</a>
                </div>
            </div>
        </div>
        <form  className="common-form anketa-form">
          <div className="wfm-terms-of-service">
              <div className="wfm-terms-of-service__title">WORTHFM TERMS OF SERVICE</div>
              <div className="wfm-terms-of-service__text">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur semper rhoncus dolor, eu auctor ex rutrum in. Duis congue placerat consequat. Fusce felis diam, vulputate interdum fermentum a, cursus lacinia nulla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

                  <p>I am a US Citizen<br />
                  I am not a Broker/Dealer<br />
                  I am not a Public Company Director<br />
                  I do not have IRS Backwithholding<br />
                  I am not a senior political figure</p>
              </div>
              <div className="wfm-terms-of-service__confirm">
                  <Checkbox
                    id="confirm"
                    handleToggle={this.props.handleTermsToggle}
                    checked={checked}
                    />
                  <label htmlFor="confirm">I confirm that I have read and understand
                    the terms of service for WorthFM documented&nbsp;above</label>
              </div>
          </div>

          <div className="text-center">
            {this.props.children}
            <div className="wfm-not-agree-link">
                <Link to="/survey/feedback">If you cannot agree to our Term of
                  Service, please tell us why. We'd like to help.</Link>
            </div>
          </div>
        </form>

        <div className="modal fade wfm-common-modal modal-roth-ira" id="modalRothIRA" role="dialog" aria-labelledby="myModalLabel">
          <RothModal
            header={this.props.header}
            >
            <form className="common-form text-center">
                <p>Do you fill taxes jointly?</p>
                <p>
                    <span className="pad-01">
                      <Checkbox
                        type="radio"
                        id="yes"
                        />
                      <label htmlFor="yes">Yes</label></span>
                    <span className="pad-01"><input type="radio" name="jointly" className="chbx-styled" id="no" /> <label htmlFor="no">No</label></span>
                </p>
                <div className="wfm-common-modal__buttons"><a href="#" className="btn btn_yellow btn_blue-text">Continue
                  <span className="wfm-i wfm-i-arr-right-blue"></span></a></div>
            </form>
            <p className="text-center pad-19"><a href="#" data-descr="iraDescr" className="wfm-link-with-descr">What is Roth IRA?</a></p>
            <div  className="wfm-link-descr pad-18">A Roth IRA is a type of retirement
              account that allows earnings to grow tax-free.Contributions are made
               with after-tax dollars, and withdrawals are tax and penalty-free as
                long as the account has been open for five years and you are over 59 1/2.
                The amount that you are able contribute is dependent upon your income,
                age, and tax filling status. Roth IRAs do not require you to start
                making withdrawals at a certain age and they also allow an individual
                to make a tax and penalty-free withdrawal up to $10,000 for a first
                time home purchase.</div>
          </RothModal>
        </div>
      </div>
    );
  }
}

BundleForm.propTypes = {
  children: PropTypes.object.isRequired,
  handleTermsToggle: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  joint: PropTypes.string,
}

export default BundleForm;
