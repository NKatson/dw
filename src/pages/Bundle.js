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
        <p>Your WorthFM account bundle contains three accounts: one for saving, investing, and retirement - all personalized for you.</p>
        <div className="wfm-account-plans">
            <div className="wfm-account-plan">
                <div className="wfm-account-plan__pic"><img src={require('../../static/images/plan-savings.jpg')} alt="" /></div>
                <div className="wfm-account-plan__title">Savings</div>
                <div className="wfm-account-plan__text">
                    No financial picture is balanced without a savings account you can tap for emergencies or short-term goals. Money there when you need it.
                </div>
            </div>
            <div className="wfm-account-plan">
                <div className="wfm-account-plan__pic"><img src={require('../../static/images/plan-investing.jpg')} alt="" /></div>
                <div className="wfm-account-plan__title">Investing</div>
                <div className="wfm-account-plan__text">
                    Here’s where you can make your money start working for you for the long-term. Because a dollar can be more than just a dollar. All WorthFM investing accounts are backed by TD Ameritrade. 
                </div>
            </div>
            <div className="wfm-account-plan">
                <div className="wfm-account-plan__pic"><img src={require('../../static/images/plan-retirement.jpg')} alt="" /></div>
                <div className="wfm-account-plan__title">Retirement</div>
                <div className="wfm-account-plan__text">
                    It never hurts to plan for your future. This account is set up as a {this.props.accountText} backed by TD Ameritrade. By default, it’s turned off, but you can turn it on whenever you want from your WorthFM dashboard.
                    <a onClick={::this.showModal} href="#">I want a {this.props.accountLink} instead</a>
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
