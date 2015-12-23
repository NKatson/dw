import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';

import { DynamicForm, ConnectBank, BundleForm, Accounts, Transfer, MailCheck, Buttons, Docusign } from '../components';
import * as surveyActions from '../redux/actions/survey';
import * as bundleActions from '../redux/actions/bundle';
import * as api from '../utils/apiClient';
import { setBanks, searchBanks } from '../redux/actions/plaid';
import { WelcomeBack, Question } from '../atoms';

class FormContainer extends React.Component {
  handleShowSsnClick() {
    this.props.dispatch(surveyActions.toggleSsn());
  }
  handleTermsToggle() {
    this.props.dispatch(surveyActions.toggleTerms());
  }
  handleSelectChange(e) {
    this.props.dispatch(surveyActions.selectChange(e.target.value));
  }
  handlePrevClick(e) {
    e.preventDefault();
    this.props.dispatch(surveyActions.prevClicked());
  }
  handleWelcomeClose() {
    this.props.dispatch(surveyActions.hideWelcomeBack());
  }
  handleBanksSearch(e) {
    this.props.dispatch(searchBanks(e.target.value));
  }
  parseMultipleNames(question) {
    let names = [];
    question.answers.map(answer => {
      if (answer.dynamicFields && answer.dynamicFields.length > 0) {
          if (answer.value !== this.props.stateSelectValue) return;
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
    return fields;
  }
  grabPersonalData() {
    const { formData } = this.props;
    let result = {};
    if (formData && formData && formData['personal-step-1']) {
      const data = formData['personal-step-1'];
      for (let key in data) {
        if (key.charAt(0) !== '_') {
          result[key] = data[key].value;
        }
      }
    }
    result.first_name = 'Emily';
    result.last_name = 'Jipson';
    return result;
  }
  handleFormSubmit(data) {
    const { step, categoryIndex, formData, nextLink } = this.props;
    if (step === 1 && categoryIndex === 0 && data.annual_income && data.employment_status) {
      let val = data.annual_income.replace(/[,\$\s]/g, '');
      data.annual_income = parseInt(val);
      api.sendPersonal({
        ...::this.grabPersonalData(),
        ...data
        }, () => {
        console.log('OK!');
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
      if (err) return console.log(err);
      if (categoryIndex === 2 &&  step === 2) {
        this.context.history.replaceState(null, nextLink);
      } else {
        window.location.href = `http://${window.location.hostname}${port}${nextLink}`;
      }
    });
  }
  renderDynamicForm(category, form, index) {
    const { prevLink, nextLink, formData } = this.props;
    return <DynamicForm
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
              nextLink={this.props.nextLink}
              prevLink={this.props.prevLink}
              disabledNext={this.props.disabledNext}
              onSubmit={::this.handleFormSubmit}
              dispatch={this.props.dispatch}
              formData={this.props.formData}
              radio={this.props.radio}
              showWelcomeBack={this.props.showWelcomeBack}
             >
            {prevLink ? <Link to={prevLink} className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
    </DynamicForm>
  }
  renderBanks() {
    const { prevLink, nextLink, banks, searchBanks, state, exit } = this.props;
    return <ConnectBank
            banks={banks}
            bankTypes={['amex', 'bofa', 'chase', 'citi', 'suntrust', 'td', 'us', 'wells']}
            searchBanks={searchBanks}
            handleBanksSearch={::this.handleBanksSearch}
            exit={exit}
            state={state}
            ><Buttons prevLink={prevLink} /></ConnectBank>
  }
  renderBundle() {
    const { prevLink, nextLink, termsAccepted, formData } = this.props;
    let employeeIncome = formData && formData['personal-step-2'] && formData['personal-step-2'].annual_income ? formData['personal-step-2'].annual_income.value : '';
    let val = employeeIncome.replace(/[,\$\s]/g, '');
    val = val ? val = parseInt(val) : 0;

    return <BundleForm employeeIncome={val} termsAccepted={termsAccepted} nextLink={nextLink}>
        {prevLink ? <Link to={prevLink} className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
    </BundleForm>;
  }
  renderAccounts() {
    const { prevLink, nextLink, termsAccepted } = this.props;
    return (
      <Accounts onSubmit={::this.handleFormSubmit}>
        <Buttons
          prevLink={prevLink}
          nextLink="/survey/confirm/q/0"
          text="Continue"
        />
      </Accounts>
    );
  }
  renderDocusign() {
    const { prevLink, dispatch, nextLink, docusignLink} = this.props;
    return (
      <Docusign
          dispatch={dispatch}
          link={docusignLink}
         >
         {prevLink ? <Link to={prevLink} className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</Link> : null}
      </Docusign>
    );
  }
  renderView(data) {
    let result = [];
    let index = 0;
    const { prevLink, nextLink, dispatch, docusignLink, formData} = this.props;
    const firstStepData = formData && formData['personal-step-1'] && formData['personal-step-1'] ? formData['personal-step-1'] : null;
    const firstName = data.Personal[0].questions[0].defaultValue;
    const lastName = data.Personal[0].questions[1].defaultValue;

    for (let category in data) {
      data[category].map((form, index) => {
       if (index === this.props.step && category == this.props.category) {
          if (form.formKey === 'invest-step-2') {
            result.push(::this.renderBundle());
          } else if (form.formKey === 'fund-step-1') {
            result.push(::this.renderBanks());
          } else if (form.formKey === 'fund-step-2') {
            result.push(::this.renderAccounts());
          } else if (form.formKey === 'confirm-step-1') {
            result.push(::this.renderDocusign());
          } else if (form.formKey === 'fund-step-4') {
            result.push(<Transfer
              firstName={firstName}
              lastName={lastName}
              data={firstStepData}
              >
              <Buttons
                prevLink='/survey/fund/q/0'
              /></Transfer>);
          } else if (form.formKey === 'fund-step-5') {
            result.push(<MailCheck data={firstStepData}>
              <Buttons
                prevLink='/survey/fund/q/0'
              /></MailCheck>);
          } else {
            result.push(::this.renderDynamicForm(category, form, index));
          }
        }
      });
    }
    return result;
  }
  render() {
    const { category, currentIndex, step, nextLink, prevLink, showWelcomeBack, formData } = this.props;
    const firstName = formData && formData['personal-step-1'] && formData['personal-step-1'].first_name && formData['personal-step-1'].first_name.value ?
                      formData['personal-step-1'].first_name.value : '';
    return (
      <div>
        {showWelcomeBack ? <WelcomeBack
            firstName={firstName}
            handleClose={::this.handleWelcomeClose}
           /> : null}
        {::this.renderView(this.props.data.toJS())}
        <Question />
      </div>
    );
  }
}

FormContainer.contextTypes = {
  history: RouterPropTypes.history,
};

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

    banks: state.plaid.banks,
    searchBanks: state.plaid.searchBanks,
    exit: state.plaid.exit,

    termsAccepted: state.survey.get('termsAccepted'),

    docusignLink: state.docusign.link,
  };
}

export default connect(mapStateToProps)(FormContainer);
