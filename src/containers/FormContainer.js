import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { DynamicForm } from '../components';
import * as surveyActions from '../redux/actions/survey';
import * as api from '../utils/apiClient';
import { PropTypes as RouterPropTypes, Link } from 'react-router';

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
      if (answer.dynamicFields && answer.dynamicFields.length > 0) {
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
  grabPersonalData() {
    const { formData } = this.props;
    let result = {};
    if (formData && formData && formData['personal-step-1']) {
      const data = formData['personal-step-1'];
      for (let key in data) {
        console.log(key);
        if (key.charAt(0) !== '_') {
          result[key] = data[key].value;
        }
      }
    }
    return result;
  }
  handleFormSubmit(data) {
    const { step, categoryIndex, formData, nextLink } = this.props;
    if (step === 1 && categoryIndex === 0 && data.annual_income && data.employment_status) {
      let val = data.annual_income.replace(/[,\$\s]/g, '');
      val = parseInt(val);

      api.sendPersonal({
        ...::this.grabPersonalData(),
        annual_income: val,
        employment_status: data.employment_status,
      }, () => {
        api.sendQuestions(data);
      });
    }

    let port = window.location.port.length > 0 ? ':' + window.location.port : '';
    const { state } = this.props;

    if (categoryIndex !== 0) {
        api.sendQuestions(data);
    }

    api.saveState({
      survey: state.survey.toJS(),
      form: state.form,
      auth: state.auth.toJS()
    }, (err) => {
      window.location.href = `http://${window.location.hostname}${port}${nextLink}`;
    });
  }
  backClicked(e) {
    const {state} = this.props;
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
                    accountType={this.props.accountType}
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
                    radio={this.props.radio}
                    showWelcomeBack={this.props.showWelcomeBack}
                   >
                  {prevLink ? <Link to={prevLink} onClick={::this.backClicked}  className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
          </DynamicForm>);
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
      </div>
    );
  }
}

FormContainer.contextTypes = {
  history: RouterPropTypes.history,
};

function mapStateToProps(state) {
  return {
    state: state,
    formData: state.form.dynamic,
    welcome: state.survey.get('welcome'),
    data: state.survey.get('data'),
    showSsn: state.survey.get('showSsn'),
    category: state.survey.get('category'),
    categoryIndex: state.survey.get('categoryIndex'),
    step: state.survey.get('step'),
    formType: state.survey.get('formType'),
    stateSelectValue: state.survey.get('selectValue'),
    nextLink: state.survey.get('nextLink'),
    prevLink: state.survey.get('prevLink'),
    radio: state.survey.get('radio').toJS(),
    accountType: state.survey.get('accountType'),
    showWelcomeBack: state.survey.get('showWelcomeBack'),
  };
}

export default connect(mapStateToProps)(FormContainer);
