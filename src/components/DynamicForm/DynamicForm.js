import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputCheckbox, Select } from '../../atoms/index';

class DynamicForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
  }
  //
  // renderOption(question , fields) {
  //   return question.answers.map((answer, index) => {
  //     const field = fields[answer.name];
  //     return <Option
  //       field={field}
  //       index={index}
  //       label={answer.label}
  //       value={answer.value}
  //       />
  //   });
  // }

  renderInput(question, fields) {
    if (question.type === 'checkbox' || question.type === 'radio') {
      return question.answers.map((answer, index) => {
        const field = fields[answer.name];
        return <InputCheckbox
                index={index}
                htmlName={question.htmlName}
                label={answer.label}
                field={field}
              />
      });
    } else
     if (question.type === 'select') {
      return <Select
            options={question.answers}
            />
    } else {
      const field = fields[question.name];
      return <InputText
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
      return (
        <div className={'input-wrap ' + (question.class ? question.class : '')}>
          {::this.renderInput(question, fields)}
        </div>
      );
    });
  }
  render() {
    const { title, fields, questions, description, hint } = this.props;
    return (
      <form className="common-form personal-info-form">
        <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
          {::this.renderQuestions(questions, fields)}

        <div className="clearfix pad-05">
            <a href="#" className="pull-left pad-05__link"> Go Back</a>
            <button className="btn btn_blue w-308 pull-right" disabled>Next ></button>
        </div>
    </form>
    );
  }
}

export default reduxForm({form: 'dynamic'})(DynamicForm);
