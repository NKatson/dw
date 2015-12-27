import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { RadioGroup, Radio } from 'react-icheck';
import { InputText, Select, SsnInput, Checkbox } from '../atoms';
import { Buttons, InputMultiple } from '../components';
import { validateSurvey as validate } from '../utils/validation';
import { riskSelector } from '../redux/selectors/surveySelectors';
import * as surveyActions from '../redux/actions/survey';

class RiskForm extends React.Component {
  componentWillMount() {
    this.props.dispatch(surveyActions.setCategoryIndex(1));
  }
  render () {
    const { question, fields, title, nextLink, prevLink, riskValue } = this.props;
    return (
      <div>
        <h2>2. SET UP YOUR ACCOUNT</h2>
          <div className="text-center" style={{paddingTop: '15px'}}>
            <h4>Markets move up and down.<br />
              How comfortable are you with changes?</h4>
             <p>In 2008 the worst happened!!  The markets lost more than 50% of their value within a few short years (2007-2009).</p>
             <p>If this happened again, would you:</p>
          </div>
            
          {
            fields[question.name].visited ? 
            <div className="wfm-message wfm-message_hint">
                 By 2012 the markets had fully recovered – and since have grown 170% since the low in 2009.
                 WorthFM recommends investing over a longer period time to achieve sustained growth (if you want to change your answer below, its OK).
             </div> 
             : null
           }
             
          <form className="common-form anketa-form" autoComplete="off">
               <RadioGroup name={question.name}  className="input-wrap_with-radio-2" value={riskValue}>
                 {
                   question.answers.map((input, index) => {
                     const label = <label htmlFor={'option-' + index}><span className="common-form__label-title">{input.label}</span>
                                   </label>;
                     return (
                         <Radio
                             className="radio-component-classname"
                             {...fields[question.name]}
                             labelWrapperClass="input-wrap input-wrap_with-radio"
                             key={'option' + index}
                             id={'option-' + index}
                             radioClass="iradio_minimal"
                             increaseArea="20%"
                             value={input.value}
                             label={label}
                           />
                     );
                   })
                 }
               </RadioGroup>
               <Buttons
                 fields={fields}
                 nextLink={nextLink}
                 prevLink={prevLink}
               />
          </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'risk',
  fields: [
    'crysis2008', 
  ],
  validate,
  destroyOnUnmount: false,
}, riskSelector)(RiskForm);
