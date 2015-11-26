import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as surveyActions from '../redux/actions/survey';

class Account extends React.Component {
  handleCheckboxClick(e) {
    this.props.dispatch(surveyActions.accountTypeChanged(e.target.value));
  }
  comopnentDidMount() {
    this.props.dispatch(surveyActions.hideRecommend());
  }
  componentWillReceiveProps() {
    this.props.dispatch(surveyActions.hideRecommend());
  }
  componentWillUnmount() {
    this.props.dispatch(surveyActions.showRecommend('selected'));
  }
  render() {
    const accounts = ["Savings Account", "Investment Account", "Retirement Account", "General Investment Account"];
    const { category, step, prevLink } = this.props;

    return (
      <div>
        <h2>Account Options</h2>
        <p className="text-center pad-08">We offer three different types of accounts. Pick the one you would like to open today. (You can always create an additional account type later.)</p>
        <form className="common-form w-616" style={{marginTop: '60px'}}>
          <div className="grey-block">
            <ul className="input-wrap">
                <li className="radio-chbx-wrap">
                  <input type="radio" name="accountOptions" value="General Investment Account"  onClick={::this.handleCheckboxClick} />
                    <label><b>A General Investment Portfolio</b><br />Best if you already have a retirement account or want access to your money anywhere between 5 and 20
                    years from now — say for a big purchase like a house.
                  </label>
                </li>
                <li className="radio-chbx-wrap">
                  <input type="radio" name="accountOptions" value="Retirement Account" onClick={::this.handleCheckboxClick} />
                    <label><b>A Individual Retirement Account (IRA)</b><br />Best if you want to save for retirement. Choose Roth or Traditional.<br /></label>
                </li>
                <li className="radio-chbx-wrap">
                  <input type="radio" name="accountOptions" value="Savings Account"  onClick={::this.handleCheckboxClick} />
                    <label><b>Savings Account</b><br />Best if you want to save money for the short term. You will most likely need access to this money in 5 years or less.
                  </label>
                </li>
            </ul>
          </div>
        </form>
        <div className="clearfix pad-05">
            {prevLink ?  <Link to={prevLink} className="pull-left pad-05__link"> Go Back </Link> : null}
            <Link  to={`/survey/${category.toLowerCase()}/q/${step}`} className="btn btn_blue w-308 pull-right">Next ></Link>
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
