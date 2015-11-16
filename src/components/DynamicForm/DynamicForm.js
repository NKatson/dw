import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { InputText, InputCheckbox, Option } from '../index';

class DynamicForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
  }

  renderOption(question , fields) {
    return question.answers.map((answer, index) => {
      const field = fields[answer.name];
      return <Option
        field={field}
        index={index}
        label={answer.label}
        value={answer.value}
        />
    });
  }

  renderInput(question, fields) {
    if (question.type === 'checkbox' || question.type === 'radio') {
      return question.answers.map((answer, index) => {
        const field = fields[answer.name];
        return <InputCheckbox
                type={question.type}
                index={index}
                htmlName={question.htmlName}
                label={answer.label}
                field={field}
              />
      });
    } else if (question.type === 'select') {
      return <select>{::this.renderOption(question, fields)}</select>

    } else {
      const field = fields[question.name];
      return <input type={question.type} placeholder={question.placeholder} key={question.name} label={question.label} {...field} />;
    }
  }

  render() {
    const { title, fields, questions } = this.props;
    return (
      <form>
        <h2>{title}</h2>
        {questions.map((question, index) => {
          return <div key={index}>
            <label>{question.label}</label>
            {::this.renderInput(question, fields)}
          </div>
        })}
        <button>Submit</button>
    </form>
    );
  }
}

export default reduxForm({form: 'dynamic'})(DynamicForm);
