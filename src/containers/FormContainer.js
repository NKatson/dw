import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DynamicForm } from '../components';
import * as surveyActions from '../redux/actions/survey';
import * as api from '../utils/apiClient';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { blur } from 'redux-form/lib/actions';

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
  onSsnChange(ssn) {
    this.props.dispatch(surveyActions.ssnChange(ssn));
  }
  handleSelectChange(e) {
    console.log('Select change!');
    this.props.dispatch(surveyActions.selectChange(e.target.value));
  }
  handlePrevClick(e) {
    e.preventDefault();
    this.props.dispatch(surveyActions.prevClicked());
  }
  chooseAccount(e) {
    this.props.dispatch(surveyActions.accountTypeChanged(e.target.value));
  }
  parseMultipleNames(question) {
    let names = [];
    question.answers.map(answer => {
      if (answer.dynamicFields) {
          if (answer.label !== this.props.stateSelectValue) return;
          if (answer.dynamicFields.length > 0) {
            answer.dynamicFields.map(field => {
              names.push(field.name);
            });
          }
      }
      if (answer.name) {
        names.push(answer.name);
      }
    });
    return names;
  }
  generateFields(form) {
    const multiple = ['checkbox', 'radio', 'dropdown'];

    // dropdown here fo dynamicFields
    const fields =  form.questions.reduce((fields, question) => {
      if (multiple.indexOf(question.type) !== -1) {
        const names = ::this.parseMultipleNames(question);
        fields.push(...names);

        if (question.type === 'dropdown') { // save dropdown select name
          fields.push(question.name);
        }

        return fields;
      }

      fields.push(question.name);
      return fields;
    }, []);
    return fields
  }

  handleFormSubmit(data) {
    const { storedSsn, step, categoryIndex, formData, nextLink } = this.props;
    if (step === 0 && categoryIndex === 0) {
      // check SSN presents
      if (!storedSsn || storedSsn.length === 0) {
        this.props.dispatch(surveyActions.ssnErrorChange('Required'));
        return;
      }
      // The Basics case
      let result = {};
      if (formData && formData.dynamic && formData.dynamic['personal-step-1']) {
        const data = this.props.formData.dynamic['personal-step-1'];
        for (let key in data) {
          if (key.charAt(0) !== '_') {
            result[key] = data[key].value;
          }
        }
      }
      // send welcome page question
      result = Object.assign({}, result, {
        describe_self: this.props.welcome,
      });
      api.sendPersonal(result);
    }

    if (categoryIndex === 0) {
      let port = window.location.port.length > 0 ? ':' + window.location.port : '';
      window.location.href = `http://${window.location.hostname}${port}${nextLink}`
    } else {
      this.context.history.pushState(null, nextLink);
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
                    disabledNext={this.props.disabledNext}
                    onSubmit={::this.handleFormSubmit}
                    dispatch={this.props.dispatch}
                    formData={this.props.formData}
                    onSsnChange={::this.onSsnChange}
                    storedSsn={this.props.storedSsn}
                    ssnError={this.props.ssnError}
                   >
                    {prevLink ? 
                        <Link to={prevLink} className="common-form__back-link">
                          <span className="wfm-i wfm-i-arr-left-grey"></span> Go Back 
                        </Link>
                       : null}
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
    formData: state.form.dynamic,
    welcome: state.survey.get('welcome'),
    data: state.survey.get('data'),
    showSsn: state.survey.get('showSsn'),
    storedSsn : state.survey.get('storedSsn'),
    ssnError: state.survey.get('ssnError'),
    category: state.survey.get('category'),
    categoryIndex: state.survey.get('categoryIndex'),
    step: state.survey.get('step'),
    formType: state.survey.get('formType'),
    stateSelectValue: state.survey.get('selectValue'),
    showRecommend: state.survey.get('showRecommend'),
    nextLink: state.survey.get('nextLink'),
    prevLink: state.survey.get('prevLink'),
    disabledNext: state.survey.get('disabledNext')
  };
}

export default connect(mapStateToProps)(FormContainer);
