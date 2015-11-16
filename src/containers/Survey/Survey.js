import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getData } from '../../redux/actions/survey';
import { connect } from 'react-redux';

class Survey extends React.Component {
  componentDidMount() {
    console.log('Request');
    dispatch(getData());
  }
  handleSubmit() {
  }
  generateFields(form) {
    return form.questions.reduce((fields, question) => {
      if (question.type === 'checkbox' || question.type === 'radio') {
        let names = question.answers.map(answer => answer.name);
        fields.push(...names);
        return fields;
      }
      fields.push(question.name);
      return fields;
    }, []);
  }
  renderCategories() {

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
  render () {
    return (
      <div class="wide-block bg-white common-block">
        <div class="container container-1">
          <div class="wfm-steps">

          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Survey);
