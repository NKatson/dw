import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import  { Link } from 'react-router';
import { saveState } from '../redux/actions/saveActions';

class Buttons extends React.Component {
  formIsValid() {
    const fields = this.props.fields;
    const formValid = Object.keys(fields).reduce((prev, cur) => {
      let error = fields[cur].error ? 0 : 1;
      if (cur === 'crysis2008' && fields[cur].visited) {
        error = 1;
      }
      return prev * error;
    }, 1);
    
    return formValid;
  }
  save() {
    const { state, onNextClick} = this.props;
    saveState(state, () => {
      if (onNextClick) {
        onNextClick();
      }
    });
  }
  render () {
    const { nextLink, prevLink, text, fields } = this.props;
    const nextProps = {};
    const notDisabled = fields ? ::this.formIsValid() : true;
    return (
      <div className="text-center">
        <div className="common-form__buttons">
          {prevLink ? <Link to={prevLink}  className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
          {
            nextLink ? 
            <Link 
              onClick={::this.save}
              to={nextLink} 
              className={'btn btn_yellow ' + (notDisabled ? '' : 'disabled')}
              disabled={!notDisabled}
              >
              {text ? text : 'Next'} <span className="wfm-i wfm-i-arr-right-grey"></span>
            </Link>
             : null
            }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: {
      form: state.form,
      survey: state.survey.toJS(),
      bundle: state.bundle,
      plaid: state.plaid,
    },
  }
}

export default connect(mapStateToProps)(Buttons);