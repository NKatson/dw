import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import  PersonalForm from './PersonalForm';
import { InputText, InputMultiple, Select, SsnInput } from '../atoms/index';
import { validateSurvey as validate } from '../utils/validation';
import * as api from '../utils/apiClient';
import { blur, focus } from 'redux-form/lib/actions';

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
  componentDidMount() {
    let { questions, fields, dispatch } = this.props;
    let last;
    questions.map((question, index) => {
      if (question.defaultValue) {
          dispatch(blur('date_of_birth'));
      }
    });
  }
  renderInput(question, fields) {
    const multipleTypes = ['checkbox', 'radio'];
    if (multipleTypes.indexOf(question.type) !== - 1) {
      const inputs = ::this.getInputs(question, fields);

      return <InputMultiple
              key={question.name}
              question={question}
              inputs={inputs}
              handleClick={this.props.formType === 'recommend' ? this.props.chooseAccount : null}
            />
    } else if (question.type === 'dropdown') {
      let result = [];
      const options = ::this.getInputs(question, fields);
      result.push(<Select
            defaultValue={question.defaultValue}
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
    const { title, fields, questions, description, hint, categoryIndex, step, prevLink, nextLink, type } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <form className="common-form anketa-form" onSubmit={this.props.handleSubmit}>
            {::this.renderQuestions(questions, fields)}
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
    type: PropTypes.string.isRequired,
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
    ssnError: PropTypes.string
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
