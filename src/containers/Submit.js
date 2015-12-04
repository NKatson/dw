import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Submit extends React.Component {
  render() {
    return (
      <div className="text-center">
        <div className="common-form personal-info-form" style={{margin: '150px'}}>Your data has been saved.<br />
          <Link
            to="/welcome"
            className="btn btn_yellow"
            style={{marginTop: '20px'}}
            >welcome page</Link>
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
