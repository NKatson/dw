import React, { PropTypes } from 'react';
import  { Link } from 'react-router';

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
  render () {
    const { nextLink, prevLink, text, fields } = this.props;
    const notDisabled = fields ? ::this.formIsValid() : true;
    return (
      <div className="text-center">
        <div className="common-form__buttons">
          {prevLink ? <Link to={prevLink}  className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
          {
            nextLink ? 
            <Link 
              to={nextLink} 
              className={'btn btn_yellow ' + (notDisabled ? '' : 'disabled')}
              disabled={!notDisabled}>
              {text ? text : 'Next'} <span className="wfm-i wfm-i-arr-right-grey"></span></Link>
             : null
            }
        </div>
      </div>
    );
  }
}

export default Buttons;