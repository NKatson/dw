import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DynamicForm } from '../../components';
import * as surveyActions from '../../redux/actions/survey';
import * as api from '../../utils/apiClient';

class FormContainer extends React.Component {
  componentDidMount(props) {
    let { category = 'personal', number = 0 } = this.props.params;
    this.props.dispatch(surveyActions.changeQuestion(category, parseInt(number)));
    if (this.props.categoryIndex === 0 && this.props.step == 0) {
      this.props.dispatch(surveyActions.disableNext());
      setTimeout(() => {
        this.props.dispatch(surveyActions.enableNext());
      }, 15000);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { category: nextCategory = null, number: nextNumber = null } = nextProps.params;
    const { category, step } = this.props;

    if (nextCategory && nextNumber && (category.toLowerCase() != nextCategory || parseInt(nextNumber) != step)) {
      this.props.dispatch(surveyActions.changeQuestion(nextCategory, parseInt(nextNumber)));
    }
  }
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
  chooseAccount(e) {
    this.props.dispatch(surveyActions.accountTypeChanged(e.target.value));
  }
  handleSubmit(data) {
    console.log(data);
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
    const multiple = ['checkbox', 'radio'];
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
                    formType={this.props.formType}
                    fields={::this.generateFields(form)}
                    questions={form.questions}
                    handleShowSsnClick={::this.handleShowSsnClick}
                    showSsn={this.props.showSsn ? true : false}
                    categoryIndex={this.props.categoryIndex}
                    step={this.props.step}
                    handleSelectChange={::this.handleSelectChange}
                    stateSelectValue={this.props.stateSelectValue}
                    chooseAccount={::this.chooseAccount}
                    nextLink={this.props.nextLink}
                    prevLink={this.props.prevLink}
                    formData={this.props.formData}
                    disabledNext={this.props.disabledNext}
                   />);
        }
      });
    }
    return result;
  }
  render () {
    const { category, currentIndex, step, nextLink, prevLink, showRecommend } = this.props;
    return (
      <div style={{paddingTop: showRecommend ? '60px' : 0 }}>
        {::this.renderForms(this.props.data.toJS())}
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
    formData: state.form,
    disabledNext: state.survey.get('disabledNext')
  };
}

export default connect(mapStateToProps)(FormContainer);
