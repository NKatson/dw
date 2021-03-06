import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Print } from '../atoms';
import { Buttons } from '../components';
import { setCategoryIndex } from '../redux/actions/survey';

class MailCheck extends React.Component {
  componentWillMount() {
    this.props.dispatch(setCategoryIndex(2));
  }
  render () {
    return (
      <div>
        <h2>MAIL A CHECK</h2>
          <p>Please send your check to the following address.<br />
                  Enter your WorthFM TD Ameritrade Account Number in the Memo
                  field on your check.</p>
              <Print />
              <div className="pad-17">
                <b>Regular mail:</b>
                  <p>TD Ameritrade <br />
                   PO Box 2760<br />
                 Omaha, NE 68172<br /></p>
                  <br />
                <p><b>Overnight mail:</b><br />
                  TD Ameritrade<br />
                  200 S 108th Ave<br />
                  Omaha, NE 68154<br />
                </p>
              </div>
              <form className="common-form anketa-form">
                <Buttons
                  prevLink='/survey/banks'
                  nextLink='/survey/docusign'
                 />
              </form>
      </div>
    );
  }
}

export default connect(null, dispatch => {
  return {
    dispatch,
  }
})(MailCheck);
