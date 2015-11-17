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

  renderForms() {
    return forms.map((form, index) => {
      return  <DynamicForm
                key={index}
                title={form.title}
                formKey={form.formKey}
                fields={::this.generateFields(form)}
                questions={form.questions}
               />
           });
  }

  render() {
    const { title, fields, questions, description, hint } = this.props;
    return (
      <form className="common-form personal-info-form">
        <h2>{title}</h2>
         {description ? <p>{description}</p> : null}
         {hint ? <p className="wfm-hint">(Hint: You definitely know all the answers to these questions!)</p> : null}

         {questions.map((question, index) => {
          return <div key={question.title} className="input-wrap">
            {::this.renderInput(question, fields)}
          </div>
        })}

        <div className="clearfix pad-05">
            <a href="#" className="pull-left pad-05__link"> Go Back</a>
            <button className="btn btn_blue w-308 pull-right" disabled>Next ></button>
        </div>
    </form>
    );
  }
}

export default reduxForm({form: 'dynamic'})(DynamicForm);
