import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import  PersonalForm from './PersonalForm';
import { InputText, Select, RecommendBlock, WelcomeBack } from '../atoms/index';
import { InputMultiple } from '../components';
import { validateSurvey as validate } from '../utils/validation';
import * as api from '../utils/apiClient';
import { radioClick, enableButton } from '../redux/actions/survey';

class DynamicForm extends Component {
  getInputs(question, fields) {
    return question.answers.map((answer, index) => {
      return {
        label: answer.label,
        field: fields[answer.name],
        value: answer.value ? answer.value : answer.name,
        defaultChecked: answer.defaultChecked,
      }
    });
  }
  handleRadioClick(name, value) {
    this.props.dispatch(radioClick(name, value));
  }
  renderInput(question, fields) {
    const multipleTypes = ['checkbox', 'radio'];
    if (multipleTypes.indexOf(question.type) !== - 1) {
      const inputs = ::this.getInputs(question, fields);
      const { formKey, chooseAccount, radio } = this.props;
      return <InputMultiple
              key={question.name}
              question={question}
              inputs={inputs}
              selectedValue={radio[question.htmlName] ? radio[question.htmlName] : null }
              handleClick={::this.handleRadioClick}
            />
    } else if (question.type === 'dropdown') {
      let result = [];
      const options = ::this.getInputs(question, fields);
      const { stateSelectValue } = this.props;
      result.push(<Select
            stateSelectValue={stateSelectValue ? stateSelectValue : null }
            field={fields[question.name]}
            key={question.name}
            label={question.label}
            additionalClass={question.class ? question.class : ''}
            options={question.answers}
            placeholder={question.placeholder}
            handleChange={this.props.handleSelectChange}
            />);
      // render child dynamic fields
      question.answers.map((answer, index) => {
        if (answer.dynamicFields && answer.dynamicFields.length > 0) {
          answer.dynamicFields.map((field, index) => {
            // is parent selected ?
            if (answer.label === this.props.stateSelectValue) {
              result.push(::this.renderInput(field, fields));
            }
          });
        }
      });

      return result;
    } else {
      const field = fields[question.name];
      return <InputText
                key={question.name}
                additionalClass={question.class ? question.class : ''}
                label={question.label}
                isNormalized={question.needNormalize ? true : false}
                field={field}
                defaultValue={question.defaultValue && question.name==='employer' ? question.defaultValue : '' }
                type={question.type}
                placeholder={question.placeholder}
              />;
          }
  }
  renderQuestions(questions, fields) {
    const { categoryIndex, step } = this.props;
    if (categoryIndex === 0 && step === 0) {
      const { showSsn, storedSsn, formData, handleShowSsnClick } = this.props;
      return (
        <PersonalForm
          questions={questions}
          fields={fields}
          handleShowSsnClick={handleShowSsnClick}
          showSsn={showSsn}
          />
      );
    } else {
      return questions.map((question, index) => {
          return ::this.renderInput(question, fields);
      });
    }
  }
  render() {
    const { title, formKey, fields, questions, description, hint, categoryIndex, step, prevLink, nextLink, accountType, radio } = this.props;
    const account = radio['invest-radio-217'] && !accountType ? radio['invest-radio-217'] : accountType;
    const selected = accountType ? true : false;

    // hardcode this time
    let disableNext = false;
    if (categoryIndex === 1 && step === 0 && !radio['invest-radio-217']) {
      disableNext = true;
    }

    if (categoryIndex === 1 && step === 1 && !radio['invest-radio-210']) {
      disableNext = true;
    }

    return (
      <div>
        <h2>{title}</h2>
        {formKey === "invest-step-2" ?
          <RecommendBlock
            isSelected={selected}
            accountType={account}
          />
           : null}
       {categoryIndex === 1 && step === 1 ?
         <div className="text-center">
           <h4>Markets move up and down.<br />
             How comfortable are you with changes?</h4>
           <p>In 2008 the worst happened!!  The markets lost more than 50% of their value within a few short years (2007-2009).</p>
           <p>If this happened again, would you:</p>
         </div>
          : null}
          <p>{description}</p>

        <form className="common-form anketa-form" onSubmit={this.props.handleSubmit} autoComplete="off">
            {::this.renderQuestions(questions, fields)}
            {categoryIndex === 1 && step === 1 ?
              <p className="text-center">Tell me more about <a href="#" className="grey-color">how the markets fluctuate</a></p>
               : null}
            <div className="text-center">
                <div className="common-form__buttons">
                    {this.props.children}
                    <button
                      className="btn btn_yellow"
                      disabled={disableNext}
                      >Next <span className="wfm-i wfm-i-arr-right-grey"></span></button>
                </div>
            </div>
        </form>
      </div>
    );
  }
}

DynamicForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    questions: PropTypes.array.isRequired,
    hint: PropTypes.string,
    showSsn: PropTypes.bool,
    ssnValue: PropTypes.string,
    categoryIndex: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    stateSelectValue: PropTypes.string,
    handleShowSsnClick: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    prevLink: PropTypes.string.isRequired,
    nextLink: PropTypes.string.isRequired,
    formData: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    radio: PropTypes.object.isRequired,
    showWelcomeBack: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}
export default reduxForm({
  form: 'dynamic',
  validate,
  destroyOnUnmount: false,
}, null, mapDispatchToProps)(DynamicForm);