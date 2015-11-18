import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getData } from '../../redux/actions/survey';
import { connect } from 'react-redux';
import { DynamicForm, Category } from '../../components';
import { toggleSsn } from '../../redux/actions/survey';

class Survey extends React.Component {
  handleShowSsnClick() {
    this.props.dispatch(toggleSsn());
  }
  componentDidMount() {
    if (!this.props.requesting) {
      this.props.dispatch(getData());
    }
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
  renderCategories(data) {
    let result = [];
    let index = 0;
    const count = Object.keys(data).length;

    for (let category in data) {
      result.push(<Category
                  isActive={index === 0}
                  title={category}
                  isLast={index === data.length - 1 ? true : false }
                  key={'category-' + category}
                  />);
      if (index !== count - 1) {
        result.push(<div key={'dvdr-' + index} className="wfm-steps__dvdr"></div>);
      }
      index++;
    }

    return result;
  }
  renderForms(data) {
    let result = [];
    let index = 0;
    for (let category in data) {
      data[category].map((form, index) => {
        result.push(<DynamicForm
                  key={form.title}
                  title={form.title}
                  description={form.description}
                  hint={form.hint}
                  formKey={form.formKey}
                  fields={::this.generateFields(form)}
                  questions={form.questions}
                  handleShowSsnClick={::this.handleShowSsnClick}
                  showSsn={this.props.showSsn ? true : false}
                 />);
      });
    }
    return result;
  }
  render () {
    const { data } = this.props;
    let categories = [];
    let steps = [];
    if (typeof data !== 'undefined') {
      categories = ::this.renderCategories(data.toJS());
      steps = ::this.renderForms(data.toJS());
    }
    return (
      <div className="wide-block bg-white common-block">
        <div className="container container-1">
          <div className="wfm-steps">
             {categories}
          </div>
          {steps}
        </div>
      </div>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    data: state.survey.get('data'),
    requesting: state.survey.get('requesting'),
    showSsn: state.survey.get('showSsn'),
  };
}
export default connect(mapStateToProps)(Survey);
