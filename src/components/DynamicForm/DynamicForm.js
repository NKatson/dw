import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputCheckbox, Select } from '../../atoms/index';
import { validateSurvey as validate } from '../../utils/validation';

class DynamicForm extends Component {
  renderInput(question, fields, parentValue = null) {
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
            result.push(::this.renderInput(field, fields, answer.label));
          });
        }
      });

      return result;
    } else {
      const field = fields[question.name];
      const normalizedFields = ['phone', 'dateOfBirth'];
      return <InputText
                key={question.name}
                additionalClass={question.class ? question.class : ''}
                label={question.label}
                isNormalized={normalizedFields.indexOf(question.name) !== -1 ? true : false}
                field={field}
                type={question.type}
                placeholder={question.placeholder}
                parentValue={parentValue}
                stateSelectValue={this.props.stateSelectValue}
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
    const { title, fields, questions, description, hint } = this.props;
    return (
      <form className="common-form personal-info-form">
        <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
          {hint ? <p className="wfm-hint">{hint}</p> : null}
          {::this.renderQuestions(questions, fields)}

        <div className="clearfix pad-05">
            <a href="#" className="pull-left pad-05__link"> Go Back</a>
            <button className="btn btn_blue w-308 pull-right" disabled>Next ></button>
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
    handleShowSsnClick: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    stateSelectValue: PropTypes.string.isRequired,
};

export default reduxForm({form: 'dynamic', validate})(DynamicForm);
