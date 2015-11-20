import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as surveyActions from '../../redux/actions/survey';

class Account extends React.Component {
  handleCheckboxClick(e) {
    this.props.dispatch(surveyActions.accountTypeChanged(e.target.value));
  }
  componentWillUnmount() {
    this.props.dispatch(surveyActions.showRecommend('selected'));
  }
  render() {
    const accounts = ["Savings account", "Investment account", "Retirement account", "General Investment account"];
    const { category, step, prevLink } = this.props;
    
    return (
      <div className="input-wrap">
        {accounts.map(account => (
          <p className="radio-chbx-wrap" key={account}>
            <input type="radio" value={account} name="account-type" onClick={::this.handleCheckboxClick}/> 
            <label>{account}</label>
          </p>
        ))}
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