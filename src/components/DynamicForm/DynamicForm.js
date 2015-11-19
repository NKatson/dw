import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputCheckbox, Select } from '../../atoms/index';
import { validateSurvey as validate } from '../../utils/validation';

class DynamicForm extends Component {
  renderInput(question, fields) {
    if (question.type === 'checkbox' || question.type === 'radio') {
      return question.answers.map((answer, index) => {
        const field = fields[answer.name];
        return <InputCheckbox
                key={question.name + '-answer-' + index}
                additionalClass={question.class ? question.class : ''}
                index={index}
                htmlName={question.htmlName}
                label={answer.label}
                field={field}
              />
      });
    } else if (question.type === 'dropdown') {
      let result = [];

      // render parent select field
      result.push(<Select
            key={question.name}
            label={question.label}
            additionalClass={question.class ? question.class : ''}
            options={question.answers}
            handleChange={::this.props.handleSelectChange}
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
                type={question.type}
                placeholder={question.placeholder}
              />;
   }
  }
  renderQuestions(questions, fields) {
    let result = [];
    questions.map((question, index) => {

      // Ssn case
      if (question.name === 'ssn') {
          result.push(<div className="input-wrap__descr w-136">We will send your phone a text confirmation</div>);
          result.push(<InputText
                    key={question.name}
                    additionalClass={question.class ? question.class : ''}
                    key={question.name}
                    isNormalized={true}
                    label={question.label}
                    field={fields[question.name]}
                    type={this.props.showSsn ? 'text' : 'password'}
                    placeholder={question.placeholder}
                  />);
          result.push(<InputCheckbox
                        key={'show'}
                        additionalClass='input-wrap__descr w-136 input-wrap__addit-checkbox'
                        handleClick={this.props.handleShowSsnClick}
                        label='Show'
                        field={{}}
                      />);
      } else {
          result.push(::this.renderInput(question, fields));
      }
    });
    return result;
  }
  render() {
    const { title, fields, questions, description, hint, handleNextClick, handlePrevClick, currentStep } = this.props;
    return (
      <form className="common-form personal-info-form">
        <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
          {hint ? <p className="wfm-hint">{hint}</p> : null}
          {::this.renderQuestions(questions, fields)}

        <div className="clearfix pad-05">
          {currentStep > 0 ?  <a href="#" className="pull-left pad-05__link" onClick={handlePrevClick}> Go Back</a> : null}
            <button className="btn btn_blue w-308 pull-right" onClick={handleNextClick}>Next ></button>
        </div>
    </form>
    );
  }
}

DynamicForm.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    questions: PropTypes.array.isRequired,
    hint: PropTypes.string,
    showSsn: PropTypes.bool,
    currentStep: PropTypes.number.isRequired,
    handleShowSsnClick: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    stateSelectValue: PropTypes.string,
    handlePrevClick: PropTypes.func.isRequired,
    handleNextClick: PropTypes.func.isRequired,
};

export default reduxForm({form: 'dynamic', validate, destroyOnUnmount: false})(DynamicForm);
