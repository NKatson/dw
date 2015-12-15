import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { Select } from '../atoms/index';
import { feedbackFailed, feedbackSuccess } from '../redux/actions/survey';
import { validateSurvey as validate } from '../utils/validation';

class Feedback extends React.Component {
  handleSubmit(data) {
    if (data.reason === "I'm not a US Citizen") {
      this.props.dispatch(feedbackFailed());
    } else {
      this.props.dispatch(feedbackSuccess());
    }
  }
  render() {
    const { fields: { reason, comment }, success, failed } = this.props;
    const answers = [
      {label : "I'm not a US Citizen", value: "1"},
      {label : "I am affiliated with a Broker/Dealer", value: "2"},
      {label : "I am a 10% shareholder or director in a public company", value: "3"},
      {label : "I am a senior political officer", value: "4"},
      {label : "Other (please explain)", value: "5"},
    ]
    let text = "SEND US YOUR FEEDBACK";
    let desc = "Since you did not agree to our Terms of Service, please give us more information. We'd like to figure out how to solve your problem.";

    if (success) {
      text = "We can help";
      desc = "A WorthFM Customer Service representative will reach out of your help. In most cased, we've able to continue setting up your account.";
    } else if (failed) {
      text = "Sorry";
      desc = "At this time only US Citizens can create WorthFM accounts.";
    }
    return (
      <div>
        {
          success || failed ? <div className="wfm-vcentered-block"> <h2>{text}</h2>  <p>{desc}</p> </div>    :
          <form className="common-form anketa-form" autoComplete="off">
            <div className="anketa-form__fieldset anketa-form__main-fieldset">
                  <Select
                    field={reason}
                    label="Which of these items applies to you?"
                    options={answers}
                    />
                <div className="input-wrap">
                    <div className="input-wrap__text">Additional Comments</div>
                    <textarea className="input-text" rows="5" {...comment}></textarea>
                </div>
            </div>

            <div className="text-center">
                <div className="common-form__buttons">
                    <Link to='/survey/invest/q/0' className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link>
                    <button
                      onClick={this.props.handleSubmit(::this.handleSubmit)}
                      className="btn btn_yellow"
                      >Send <span className="wfm-i wfm-i-arr-right-grey"></span></button>
                </div>
            </div>
          </form>
        }
      </div>
    );
  }
}

Feedback.propTypes = {
    nextLink: PropTypes.string.isRequired,
    prevLink: PropTypes.string.isRequired,
    success: PropTypes.bool,
    failed: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    nextLink: state.survey.get('nextLink'),
    prevLink: state.survey.get('prevLink'),
    success: state.survey.get('feedbackSuccess'),
    failed: state.survey.get('feedbackFailed'),
  };
}

export default reduxForm({
  form: 'feedback',
  fields: ['reason', 'comment'],
  validate,
  destroyOnUnmount: true,
}, mapStateToProps)(Feedback);
