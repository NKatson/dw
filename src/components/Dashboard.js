import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { setShowCategories } from '../redux/actions/survey';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(setShowCategories(true));
  }
  componentWillUnmount() {
    this.props.dispatch(setShowCategories(false));
  }
  render() {
    return (
      <div className="wfm-dashboard-welcome">
          <h2>Welcome {this.props.userName}!</h2>
          <p>Your new WFM account should be ready soon.<br />
              It typically takes 24-48 hours to be fully setup. We’ll let you know
              by email and SMS when its all ready.</p>
            <p className="pad-21">In the mean time, take the <a href="#">MoneyType assesment</a> to give you insight
              into how you think and value money.</p>
            <p><a onClick={(e) => e.preventDefault()} href="#" className="btn btn_yellow">Find your MoneyType</a></p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    showCategories: state.survey.get('showCategories'),
    userName: state.survey.getIn(['data', 'Personal', 0, 'questions', 0, 'defaultValue']),
  }
}
export default connect(mapStateToProps)(Dashboard);
