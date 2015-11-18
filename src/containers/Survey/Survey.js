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
  handleSelectChange(e) {
    console.log(e.target);
  }
  componentDidMount() {
    if (!this.props.requesting) {
      this.props.dispatch(getData());
    }
  }
  parseMultipleNames(question) {
    let names = [];
    question.answers.map(answer => {
      names.push(answer.name);
      if (answer.dynamicFields && answer.dynamicFields.length > 0) {
        answer.dynamicFields.map(field => {
          names.push(field.name);
        });
      }
    });
    return names;
  }
  generateFields(form) {
    const multiple = ['checkbox', 'radio', 'dropdown'];
    return form.questions.reduce((fields, question) => {
      if (multiple.indexOf(question.type) !== -1) {
        const names = ::this.parseMultipleNames(question);
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
                  handleSelectChange={::this.handleSelectChange}
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
    category: state.survey.get('category'),
    step: state.survey.get('step'),
  };
}
export default connect(mapStateToProps)(Survey);
