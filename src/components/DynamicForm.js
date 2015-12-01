import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import  PersonalForm from './PersonalForm';
import { InputText, Select, SsnInput, RecommendBlock } from '../atoms/index';
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
      console.log(radio);
      console.log(question);
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
                defaultValue={question.defaultValue}
                label={question.label}
                isNormalized={question.needNormalize ? true : false}
                field={field}
                defaultValue={question.defaultValue}
                type={question.type}
                placeholder={question.placeholder}
              />;
          }
  }
  renderQuestions(questions, fields) {
    const { categoryIndex, step } = this.props;
    if (categoryIndex === 0 && step === 0) {
      const { showSsn, storedSsn, formData, ssnError, handleShowSsnClick } = this.props;
      return (
        <PersonalForm
          questions={questions}
          fields={fields}
          handleShowSsnClick={handleShowSsnClick}
          showSsn={showSsn}
          onSsnChange={this.props.onSsnChange}
          storedSsn={storedSsn}
          ssnError={ssnError}
          />
      );
    } else {
      return questions.map((question, index) => {
          return ::this.renderInput(question, fields);
      });
    }
  }
  render() {
    const { title, formKey, fields, questions, description, hint, categoryIndex, step, prevLink, nextLink } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        {formKey === "invest-step-2" ? <RecommendBlock /> : null}
        <p>{description}</p>
        <form className="common-form anketa-form" onSubmit={this.props.handleSubmit}>
            {::this.renderQuestions(questions, fields)}
            {formKey === "invest-step-2" ?
              <p className="text-center">Tell me more about <a href="#" className="grey-color">how the markets fluctuate</a></p>
               : null}
            <div className="text-center">
                <div className="common-form__buttons">
                    {this.props.children}
                    <button className="btn btn_yellow">Next <span className="wfm-i wfm-i-arr-right-grey"></span></button>
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
    onSsnChange: PropTypes.func.isRequired,
    storedSsn : PropTypes.string,
    ssnError: PropTypes.string,
    radio: PropTypes.object.isRequired,
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
