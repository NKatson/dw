import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { getData } from '../../redux/actions/survey';
import { connect } from 'react-redux';
import { DynamicForm, Category } from '../../components';
import { SurveyFormHeader } from '../../atoms';
import * as surveyActions from '../../redux/actions/survey';

class Survey extends React.Component {
  handleSubmit(data) {
    if (this.props.formType === 'recommend') {
      this.props.dispatch(surveyActions.showRecommend());
    }
    this.props.dispatch(surveyActions.submitNext(data));
  }
  handleShowSsnClick() {
    this.props.dispatch(surveyActions.toggleSsn());
  }
  handleSelectChange(e) {
    this.props.dispatch(surveyActions.selectChange(e.target.value));
  }
  // handleNextClick(type) {
  //   // account type
  //   if (type === 'recommend') {
  //      this.props.dispatch(surveyActions.accountTypeChanged('New account type'));
  //   }
  //   // handler
  //   this.props.dispatch(surveyActions.nextClicked(type));
  // }
  handlePrevClick(e) {
    e.preventDefault();
    this.props.dispatch(surveyActions.prevClicked());
  }
  componentDidMount() {
    if (!this.props.requesting) {
      this.props.dispatch(surveyActions.getData());
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
                  isCompleted={index <= this.props.categoryIndex ? true : false}
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
        if (index === this.props.step && category == this.props.category) {
          result.push(<DynamicForm
                    key={`${category}-step-${index}`}
                    type={form.type ? form.type : 'default'}
                    title={form.title}
                    description={form.description}
                    hint={form.hint}
                    formKey={form.formKey}
                    fields={::this.generateFields(form)}
                    questions={form.questions}
                    handleShowSsnClick={::this.handleShowSsnClick}
                    showSsn={this.props.showSsn ? true : false}
                    categoryIndex={this.props.categoryIndex}
                    step={this.props.step}
                    handleSelectChange={::this.handleSelectChange}
                    stateSelectValue={this.props.stateSelectValue}
                    handlePrevClick={::this.handlePrevClick}
                    onSubmit={::this.handleSubmit}
                   />);
        }
      });
    }
    return result;
  }
  render () {
    const { data, stepType, showRecommend } = this.props;
    let categories = [];
    let steps = [];
    if (typeof data !== 'undefined') {
      categories = ::this.renderCategories(data.toJS());
      steps = ::this.renderForms(data.toJS());
    }
    return (
      <div>
        <div className="wide-block bg-white common-block">
          <div className="container container-1">
            <div className="wfm-steps">
               {categories}
            </div>
          </div>
        </div>
        {showRecommend ? <SurveyFormHeader title={"We recommend..."} text="lalala" /> : null}
        <div className="wide-block bg-white">
          <div className="container container-1">
              <div className="container-small">
                  {steps}
              </div>
          </div>
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
    categoryIndex: state.survey.get('categoryIndex'),
    step: state.survey.get('step'),
    formType: state.survey.get('formType'),
    stateSelectValue: state.survey.get('selectValue'),
    showRecommend: state.survey.get('showRecommend'),
  };
}
export default connect(mapStateToProps)(Survey);
