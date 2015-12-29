import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicForm from './DynamicForm';

import { employmentSelector } from '../redux/selectors/surveySelectors';
import * as surveyActions from '../redux/actions/survey';
import { savePersonal } from '../redux/actions/saveActions';

class EmploymentContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(surveyActions.setCategoryIndex(0));
  }
  handleSelectChange(e) {
    this.props.dispatch(surveyActions.selectChange(e.target.value));
  }
  saveData(e) {
    savePersonal(this.props.form);
  }
  render () {
    const { title, description, nextLink, prevLink, selectValue, fields, question, dynamicFields, initialValues } = this.props;
    const pr = {};
    if (initialValues) {
      pr.initialValues = initialValues;
    }
    return (
      <DynamicForm
        {...pr}
        title={title}
        dynamicFields={dynamicFields}
        description={description}
        nextLink={nextLink}
        prevLink={prevLink}
        fields={fields}
        selectValue={selectValue}
        question={question}
        handleSelectChange={::this.handleSelectChange}
        onNextClick={::this.saveData}
        />
    );
  }
}

export default connect(employmentSelector)(EmploymentContainer);
