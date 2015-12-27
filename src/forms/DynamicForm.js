import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { InputText, Select } from '../atoms';
import { Buttons } from '../components';
import { validateSurvey as validate } from '../utils/validation';

class DynamicForm extends React.Component {
  renderFields() {
    const { fields, dynamicFields  } = this.props;
    return dynamicFields.map(question => {
      return <InputText
               key={question.name}
               label={question.label}
               field={fields[question.name]}
               defaultValue={question.defaultValue && question.name==='employer' ? question.defaultValue : '' }
               type={question.type}
               placeholder={question.placeholder}
             />;
         });
  }
  render () {
    const { title, description, nextLink, prevLink, fields, selectValue, question } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
          <form className="common-form anketa-form" autoComplete="off">
            <Select
                stateSelectValue={selectValue ? selectValue : null }
                field={fields[question.name]}
                key={question.name}
                label={question.label}
                additionalClass={question.class ? question.class : ''}
                options={question.answers}
                placeholder={question.placeholder}
                handleChange={this.props.handleSelectChange}
                />
              {::this.renderFields()}
              <Buttons
                nextLink={nextLink}
                prevLink={prevLink}
              />
          </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'employment',
  validate,
  destroyOnUnmount: true,
})(DynamicForm);
