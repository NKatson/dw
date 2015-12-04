import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Submit extends React.Component {
  render() {
    return (
      <div className="text-center">
        <div className="common-form personal-info-form">Your data has been saved.<br />
          <Link
            to="/survey"
            className="btn btn_yellow"
            >To Begin</Link>
        </div>
      </div>
    );
  }
}

Submit.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    form: state.form.dynamic
  }
}

export default connect(mapStateToProps)(Submit);
