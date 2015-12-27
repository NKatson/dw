import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DynamicForm from './DynamicForm';

import { employmentSelector } from '../redux/selectors/surveySelectors';
import * as surveyActions from '../redux/actions/survey';

class EmploymentContainer extends React.Component {
  handleSelectChange(e) {
    this.props.dispatch(surveyActions.selectChange(e.target.value));
  }
  render () {
    const { title, description, nextLink, prevLink, selectValue } = this.props;
    return (
      <DynamicForm
        {...this.props}
        handleSelectChange={::this.handleSelectChange}
        />
    );
  }
}

export default connect(employmentSelector)(EmploymentContainer);
