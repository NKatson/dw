import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputCheckbox, Select } from '../../atoms/index';

function checkRequired(data, fieldName, errors) {
  if (!data[fieldName]) {
    errors[fieldName] = 'Required';
  }
  return errors;
}

function checkLength({ data, fieldName, errors, min }) {
  if (errors[fieldName]) return errors;

  if (data[fieldName] && data[fieldName].length < min) {
    errors[fieldName] = `Field must be minimum ${min} characters long`;
  }
  return errors;
}

function checkRegex({ data, fieldName, regex, errors, message }) {
  if (errors[fieldName]) return errors;

  if (data[fieldName] && !regex.test(data[fieldName])) {
    errors[fieldName] = message;
  }
  return errors;
}

function validate(data) {
  let errors = {};
  const addressRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/i;
  const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/i;
  const message = 'Valid characters include a-zA-Z, 0-9 and (._-)';

  for (let field in data) {
    errors = checkRequired(data, field, errors);
  }

  errors = checkLength({ data, fieldName: 'firstName', errors, min: 2 });
  errors = checkLength({ data, fieldName: 'lastName', errors, min: 2 });
  errors = checkRegex({ data, fieldName: 'address', regex: addressRegex, errors, message });
  errors = checkRegex({ data, fieldName: 'city', regex: addressRegex, errors, message });
  errors = checkRegex({ data, fieldName: 'zipCode', regex: zipCodeRegex, errors, message });

  return errors;
}

class DynamicForm extends Component {
  handleShowClick() {
    console.log('Here!');
  }
  renderInput(question, fields) {
    if (question.type === 'checkbox' || question.type === 'radio') {
      return question.answers.map((answer, index) => {
        const field = fields[answer.name];
        return <InputCheckbox
                key={question.name + '-answer-' + index}
                additionalClass={question.class ? question.class : ''}
                index={index}
                handleClick={answer.name === 'personal-show' ? ::this.handleShowClick : null}
                htmlName={question.htmlName}
                label={answer.label}
                field={field}
              />
      });
    } else if (question.type === 'select') {
      return <Select
            key={question.name}
            additionalClass={question.class ? question.class : ''}
            options={question.answers}
            />
    } else {
      const field = fields[question.name];
      const normalizedFields = ['phone', 'dateOfBirth', 'ssn'];
      return <InputText
                key={question.name}
                additionalClass={question.class ? question.class : ''}
                key={question.name}
                isNormalized={normalizedFields.indexOf(question.name) !== -1 ? true : false}
                field={field}
                type={question.type}
                placeholder={question.placeholder}
              />;
   }
  }
  renderQuestions(questions, fields) {
    return questions.map((question, index) => {
      if (question.type === 'plain-text') {
        return <div className={'input-wrap ' + (question.class ? question.class : '')}>{question.text}</div>;
      }
      return (::this.renderInput(question, fields));
    });
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
};

export default reduxForm({form: 'dynamic', validate})(DynamicForm);
