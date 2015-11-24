import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DynamicForm } from '../../components';
import * as surveyActions from '../../redux/actions/survey';
import * as api from '../../utils/apiClient';
import { Link } from 'react-router';
import { PropTypes as RouterPropTypes } from 'react-router';

class FormContainer extends React.Component {
  componentDidMount(props) {
    let { category = 'personal', number = 0 } = this.props.params;
    this.props.dispatch(surveyActions.changeQuestion(category, parseInt(number)));
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
    // console.log(data);
  }
  parseMultipleNames(question) {
    let names = [];
    console.log(question);
    question.answers.map(answer => {
      if (answer.label !== this.props.stateSelectValue) return;
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
    const fields =  form.questions.reduce((fields, question) => {
      if (multiple.indexOf(question.type) !== -1) {
        const names = ::this.parseMultipleNames(question);
        fields.push(...names);
        return fields;
      }

      fields.push(question.name);
      return fields;
    }, []);
    return fields
  }

  handleFormSubmit(data) {
    if (this.props.step === 0 && this.props.categoryIndex === 0) {
      console.log('Personal case');
      // The Basics case
      let result = {};
      if (this.props.formData && this.props.formData.dynamic && this.props.formData.dynamic['personal-step-1']) {
        const data = this.props.formData.dynamic['personal-step-1'];
        for (let key in data) {
          if (key.charAt(0) !== '_') {
            result[key] = data[key].value;
          }
        }
      }
      api.sendPersonal(result);
    }

    if (this.props.categoryIndex === 0) {
      window.location.href = 'http://localhost:3000' + this.props.nextLink;
    } else {
      this.context.history.pushState(null, this.props.nextLink);
    }
  }

  renderForms(data) {
    let result = [];
    let index = 0;
    const { prevLink, nextLink } = this.props;

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
                    onSubmit={::this.handleFormSubmit}
                   >
                    {prevLink ? <Link to={prevLink} className="pull-left pad-05__link"> Go Back </Link> : null}
          </DynamicForm>);
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

FormContainer.contextTypes = {
  history: RouterPropTypes.history,
};


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
