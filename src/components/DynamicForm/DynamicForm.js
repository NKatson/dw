import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputCheckbox, Select } from '../../atoms/index';

function validate(data) {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'Required';
  }

  return errors;
}

class DynamicForm extends Component {
  renderInput(question, fields) {
    if (question.type === 'checkbox' || question.type === 'radio') {
      return question.answers.map((answer, index) => {
        const field = fields[answer.name];
        return <InputCheckbox
                additionalClass={question.class ? question.class : ''}
                index={index}
                htmlName={question.htmlName}
                label={answer.label}
                field={field}
              />
      });
    } else
     if (question.type === 'select') {
      return <Select
            additionalClass={question.class ? question.class : ''}
            options={question.answers}
            />
    } else {
      const field = fields[question.name];
      return <InputText
                additionalClass={question.class ? question.class : ''}
                key={question.name}
                field={field}
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
    const { title, fields, questions, description, hint, key } = this.props;
    return (
      <form className="common-form personal-info-form" key={key}>
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
    hint: PropTypes.stirng,
};

export default reduxForm({form: 'dynamic', validate})(DynamicForm);
