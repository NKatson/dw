import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { Checkbox } from '../atoms';
import { RothModal, Buttons } from '../components';
import { bundleSelector } from '../redux/selectors/surveySelectors';
import { joint, buttonClick, showModal } from '../redux/actions/bundle';
import * as surveyActions from '../redux/actions/survey';
import * as api from '../utils/apiClient';

class Bundle extends React.Component {
  componentWillMount() {
    this.props.dispatch(surveyActions.setCategoryIndex(1));
  }
  showModal() {
    this.props.dispatch(showModal());
  }
  sendData() {
    const { accountType, income } = this.props;
    api.sendAccountType({
      accountType, income
    }, err => {});
  }
  handleTermsToggle(e) {
    const isAccepted = e.target.checked;
    this.props.dispatch(surveyActions.toggleTerms(isAccepted));
    if (isAccepted) {
      api.acceptTerms();
    } else {
      api.cancelTerms();
    }
  }
  render() {
    const { handleTermsToggle, checked, employeeIncome, termsAccepted, nextLink } = this.props;
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
                    Your Worth FM sunset account offers you confidence in a secure future. This account is set up as a {this.props.accountText} at TD Ameritrade and can be enabled from your WorthFM homepage.
                    <a onClick={::this.showModal} href="#">Want a {this.props.accountLink} instead?</a>
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
                    handleClick={::this.handleTermsToggle}
                    checked={termsAccepted}
                    label="I confirm that I have read and understand the terms of service for WorthFM documented above"
                    />
              </div>
          </div>

          <RothModal {...this.props} employeeIncome={employeeIncome}  />

          <div className="text-center">
            <Buttons
              onNextClick={::this.sendData}
              disabled={!this.props.termsAccepted}
              nextLink={this.props.nextLink}
              prevLink={this.props.prevLink}
            />

          <div className="wfm-not-agree-link">
                <Link to="/feedback">If you cannot agree to our Term of
                  Service, please tell us why. We'd like to help.</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(bundleSelector)(Bundle);