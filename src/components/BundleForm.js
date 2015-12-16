import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Checkbox } from '../atoms';
import { RothModal } from '../components';
import { joint, buttonClick, showModalToggle } from '../redux/actions/bundle';

class BundleForm extends React.Component {
  showModal() {
      this.props.dispatch(showModalToggle());
  }
  render() {
    const { handleTermsToggle, checked, showModal, joint, step } = this.props;
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

          <RothModal
            {...this.props}
          />

          <div className="text-center">
            {this.props.children}
            <div className="wfm-not-agree-link">
                <Link to="/survey/feedback">If you cannot agree to our Term of
                  Service, please tell us why. We'd like to help.</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

BundleForm.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

function mapStateToProps(state) {
  return {
    text: state.bundle.text,
    link: state.bundle.link,
    joint: state.bundle.joint,
    header: state.bundle.header,
    question: state.bundle.question,
    showModal: state.bundle.showModal,
    step: state.bundle.step,
    totalIncome: state.bundle.income,
  };
}

export default connect(mapStateToProps)(BundleForm);
