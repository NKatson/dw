import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputMultiple, Select } from '../../atoms/index';
import { validateSurvey as validate } from '../../utils/validation';

class DynamicForm extends Component {
  renderInput(question, fields) {
    if (question.type === 'checkbox' || question.type === 'radio') {
      const inputs = question.answers.map((answer, index) => {
        return {
          label: answer.label,
          field: fields[answer.name],
          value: answer.value ? answer.value : answer.name,
        }
      });
      return <InputMultiple
              key={question.name}
              type={question.type}
              inputs={inputs}
              additionalClass={question.class ? question.class : ''}
              htmlName={question.htmlName}
            />
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
          result.push(<InputMultiple
                        key={'show'}
                        type="checkbox"
                        inputs={[{
                          field: {},
                          label: 'Show'
                        }]}
                        additionalClass='input-wrap__descr w-136 input-wrap__addit-checkbox'
                        handleClick={this.props.handleShowSsnClick}
                      />);
      } else {
          result.push(::this.renderInput(question, fields));
      }
    });
    return result;
  }
  render() {
    const { title, fields, questions, description, hint, handleNextClick, handlePrevClick, categoryIndex, step } = this.props;
    return (
      <form className="common-form personal-info-form">
        <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
          {hint ? <p className="wfm-hint">{hint}</p> : null}
          {::this.renderQuestions(questions, fields)}

        <div className="clearfix pad-05">
          {categoryIndex > 0 || step > 0 ?  <a href="#" className="pull-left pad-05__link" onClick={handlePrevClick}> Go Back</a> : null}
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
    categoryIndex: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    handleShowSsnClick: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    stateSelectValue: PropTypes.string,
    handlePrevClick: PropTypes.func.isRequired,
    handleNextClick: PropTypes.func.isRequired,
};

export default reduxForm({form: 'dynamic', validate, destroyOnUnmount: false})(DynamicForm);
