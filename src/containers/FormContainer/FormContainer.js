import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { DynamicForm } from '../../components';
import * as surveyActions from '../../redux/actions/survey';

class FormContainer extends React.Component {
  componentDidMount() {
    console.log(this.props.params.category);
  }
  handleNextClick() {
    this.props.dispatch(surveyActions.submitNext());
  }
  // handleSubmit(data) {
  //   if (this.props.formType === 'recommend') {
  //     this.props.dispatch(surveyActions.showRecommend());
  //   }
  //   this.props.dispatch(surveyActions.submitNext(data));
  // }
  handleShowSsnClick() {
    this.props.dispatch(surveyActions.toggleSsn());
  }
  handleSelectChange(e) {
    this.props.dispatch(surveyActions.selectChange(e.target.value));
  }
  handlePrevClick(e) {
    e.preventDefault();
    this.props.dispatch(surveyActions.prevClicked());
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
                    handleShowSsnClick={() => {}}
                    showSsn={this.props.showSsn ? true : false}
                    categoryIndex={this.props.categoryIndex}
                    step={this.props.step}
                    handleSelectChange={::this.handleSelectChange}
                    stateSelectValue={this.props.stateSelectValue}
                    handlePrevClick={::this.handlePrevClick}
                   />);
        }
      });
    }
    return result;
  }
  render () {
    const { category, currentIndex, step, nextLink, prevLink } = this.props;
    return (
      <div>
        {::this.renderForms(this.props.data.toJS())}
          <div className="clearfix pad-05">
              {prevLink ?  <Link to={prevLink} className="pull-left pad-05__link" onClick={::this.handlePrevClick}> Go Back </Link> : null}
              <Link to={nextLink} onClick={::this.handleNextClick} className="btn btn_blue w-308 pull-right">Next ></Link>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.survey.get('data'),
    showSsn: state.survey.get('showSsn'),
    category: state.survey.get('category'),
    categoryIndex: state.survey.get('categoryIndex'),
    step: state.survey.get('step'),
    formType: state.survey.get('formType'),
    stateSelectValue: state.survey.get('selectValue'),
    showRecommend: state.survey.get('showRecommend'),
    nextLink: state.survey.get('nextLink'),
    prevLink: state.survey.get('prevLink'),
  };
}

export default connect(mapStateToProps)(FormContainer);
