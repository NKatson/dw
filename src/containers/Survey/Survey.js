import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getData } from '../../redux/actions/survey';
import { connect } from 'react-redux';
import { DynamicForm, Category } from '../../components';

class Survey extends React.Component {
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
  renderCategories(categories) {
    let result = [];
    categories.map((cat, index) => {
      result.push(<Category
                  isActive={index === 0}
                  title={cat.name}
                  isLast={index === categories.length - 1 ? true : false }
                  key={'category-' + index}
                  />);
      if (index !== categories.length - 1) {
        result.push(<div className="wfm-steps__dvdr"></div>);
      }
    });
    return result;
  }
  renderForms(categories) {
    return categories.map(category => {
      return category.steps.map((form, index) => {
        return  <DynamicForm
                  key={form.title}
                  title={form.title}
                  description={form.description}
                  hint={form.hint}
                  formKey={form.formKey}
                  fields={::this.generateFields(form)}
                  questions={form.questions}
                 />
      });
    });
  }
  render () {
    const { data } = this.props;
    let categories = [];
    let steps = [];
    if (typeof data !== 'undefined') {
      categories = ::this.renderCategories(data.categories);
      steps = ::this.renderForms(data.categories);
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
  console.log(state.survey);
  return {
    data: state.survey.data,
    requesting: state.survey.requesting,
  };
}
export default connect(mapStateToProps)(Survey);
