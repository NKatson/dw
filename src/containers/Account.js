import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { accountTypeChanged } from '../redux/actions/survey';

class Account extends React.Component {
  componentDidMount() {
    require('icheck');
    $('input.chbx-styled').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%'
    });
    const that = this;
    $('input').on('ifChecked', function(e) {
      that.props.dispatch(accountTypeChanged(e.target.value));
    });
  }
  handleCheckboxClick(e) {
    this.props.dispatch(surveyActions.accountTypeChanged(e.target.value));
  }
  render() {
    const accounts = ["Savings Account", "Investment Account", "Retirement Account", "General Investment Account"];
    const { category, step, prevLink } = this.props;

    return (
      <div>
        <h2>2. Account options</h2>
        <p>We offer three different types of accounts. Pick the one you would like to open today. (You can always create an additional account type later.)</p>
        <form className="common-form anketa-form">
          <div className="anketa-form__fieldset">
               <div className="input-wrap input-wrap_with-radio">
                   <input type="radio" className="chbx-styled" name="accountOptions" id="option1" value="General Investment Account"  onClick={::this.handleCheckboxClick} />
                   <label htmlFor="option1"><span className="common-form__label-title">A General Investment Portfolio:</span><span className="common-form__label-text">Best if you already have a retirement account or want access to your money anywhere between 5 and 20 years from now — say for a big purchase like a house.</span></label>
               </div>
               <div className="input-wrap input-wrap_with-radio">
                   <input type="radio" className="chbx-styled" name="accountOptions" id="option2" value="Retirement Account" onClick={::this.handleCheckboxClick} />
                   <label htmlFor="option2"><span className="common-form__label-title">A Individual Retirement Account (IRA)</span><span className="common-form__label-text">Best if you want to save for retirement. Choose Roth or Traditional.</span></label>
               </div>
               <div className="input-wrap input-wrap_with-radio">
                   <input type="radio" className="chbx-styled" name="accountOptions" id="option3" value="Savings Account"  onChange={::this.handleCheckboxClick} />
                   <label htmlFor="option3"><span className="common-form__label-title">Savings Account</span><span className="common-form__label-text">Best if you want to save money for the short term. You will most likely need access to this money in 5 years or less. </span></label>
               </div>
           </div>
        </form>
        <div className="text-center">
            <div className="common-form__buttons">
                {prevLink ? <Link to={prevLink} className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
                <Link  to={`/survey/invest/q/1`} className="btn btn_yellow">Next <span className="wfm-i wfm-i-arr-right-grey"></span></Link>
            </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    prevLink: state.survey.get('prevLink'),
    category: state.survey.get('category'),
    step: state.survey.get('step'),
  }
}

export default connect(mapStateToProps)(Account);
