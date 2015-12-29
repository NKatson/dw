import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { validateSurvey as validate } from '../utils/validation';
import * as surveyActions from '../redux/actions/survey';
import { checkSelector } from '../redux/selectors/surveySelectors';
import { InputText } from '../atoms';
import { Buttons, InputMultiple } from '../components';
import { saveCheck } from '../redux/actions/saveActions';

class Check extends React.Component {
  componentWillMount() {
    this.props.dispatch(surveyActions.setCategoryIndex(2));
  }
  saveData() {
    saveCheck(this.props.checkForm);
  }
  render() {
    const { questions, fields, prevLink, nextLink, value } = this.props;
    return (
      <div>
        <h2>3. ENTER YOUR BANK ACCOUNT INFORMATION</h2>
        <p>To find the correct information, grab one of your checks and look
            at the string of the numbers at the bottom. Please enter them below.</p>

          <form className="common-form anketa-form">
            <div className="anketa-form__fieldset"><img src={require('../../static/images/routing-number.png')} alt="" /></div>
            <div className="anketa-form__fieldset">
              {questions.map(question => {
                if (question.type === 'radio') {
                  return <InputMultiple
                          value={value}
                          question={question}
                          field={fields[question.name]}
                          inputs={question.answers}
                           />
                }
                return <InputText
                  field={fields[question.name] ? fields[question.name] : null}
                  label={question.label}
                />
              })}
            </div>
            <Buttons
              fields={fields}
              prevLink={prevLink}
              nextLink={nextLink}
              onNextClick={::this.saveData}
             />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'check',
  fields: [
    'bankName',
    'accountTitle',
    'typeOfAccount',
    'transitRouting',
    'bankAccount',
    'amountOfTransaction',
  ],
  validate,
  destroyOnUnmount: false,
}, checkSelector)(Check);
