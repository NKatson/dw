import { createSelector } from 'reselect';
import { List } from 'immutable';

const dataSelector            = state => state.survey.get('data');
const categorySelector        = state => state.survey.get('category');
const categoryIndexSelector   = state => state.survey.get('categoryIndex');
const stepSelector            = state => state.survey.get('step');
const isDocusignSelector      = state => state.docusign.isDocusign;
const showCategoriesSelector  = state => state.survey.get('showCategories');
const showSsnSelector         = state => state.survey.get('showSsn');
const selectValueSelector     = state => state.survey.get('selectValue');
const formSelector            = state => state.form;
const bundleStateSelector     = state => state.bundle;
const plaidSelector           = state => state.plaid;
const termsAcceptedSelector   = state => state.survey.get('termsAccepted');
const docusignSelector        = state => state.docusign;
const showWelcomeBackSelector = state => state.survey.get('showWelcomeBack');
const confirmedSelector       = state => state.auth.get('confirmed');
const userSelector            = state => state.auth.get('user');

export const surveySelector = createSelector(
  dataSelector,
  showCategoriesSelector,
  categoryIndexSelector,
  isDocusignSelector,
  showWelcomeBackSelector,
  confirmedSelector,
  userSelector,
  (data, showCategories, categoryIndex, isDocusign, showWelcomeBack, confirmed, user) => {
    let categories = [];
    if (data) {
      categories = Object.keys(data.toJS()).map(v => v.toLowerCase());
    }
    return {
      categories: categories.map((cat, index) => {
        return {
          name: cat,
          index: index,
          isCompleted: index <= categoryIndex,
          isLast: index === categories.length - 1,
        }
      }),
      showCategories,
      currentCategoryIndex: categoryIndex,
      isDocusign,
      showWelcomeBack: showWelcomeBack,
      firstName: user && user.get('firstName') ? user.get('firstName') : '',
    }
  }
);

export const personalSelector = createSelector(
  dataSelector,
  showSsnSelector,
  formSelector,
  (data, showSsn, form) => {
    const initialObject = {
      first_name: data.getIn(['Personal', 0, 'questions', 0, 'defaultValue']),
      last_name: data.getIn(['Personal', 0, 'questions', 1, 'defaultValue']),
    }
    const formObject = {};
    for (let key in form.basicinfo) {
      if (key.charAt(0) !== '_') {
        formObject[key] = form.basicinfo[key].value;
      }
    }

    return {
      questions: data.getIn(['Personal', 0, 'questions']).toJS(),
      title: data.getIn(['Personal', 0, 'title']),
      description: data.getIn(['Personal', 0, 'description']),
      nextLink: '/survey/employment',
      prevLink: '/welcome',
      showSsn,
      initialValues: Object.assign({}, initialObject, formObject ),
    }
  }
);

export const employmentSelector = createSelector(
  dataSelector,
  selectValueSelector,
  formSelector,
  (data, selectValue, form) => {
    const question = data.getIn(['Personal', 1, 'questions', 0]);
    const answer = question.get('answers').find(answer => answer.get('value') === selectValue);
    let fields = List([
      question.get('name'),
    ]);
    let dynamicFields = [];
    if (answer) {
     fields = answer.get('dynamicFields')
                            .map(field => field.get('name'))
                            .unshift(question.get('name'));
      dynamicFields = answer.get('dynamicFields').toJS();
    }

    const initialValues = {};
    const formObject = {}
    for (let key in form.employment) {
      if (key.charAt(0) !== '_') {
        formObject[key] = form.employment[key].value;
      }
    }

    if (selectValue === 'Self-Employed') {
      initialValues.employer  = formObject.employer || 'I Own My Business';
    }

    if (selectValue === 'Employed') {
      if (formObject.employer === 'I Own My Business') {
        if (form.employment.employer.visited) {
            initialValues.employer = formObject.employer;
        } else {
          initialValues.employer = '';
        }
      }
    }

    const result = {
      title: data.getIn(['Personal', 1, 'title']),
      description: data.getIn(['Personal', 1, 'description']),
      nextLink: '/survey/risks',
      prevLink: '/survey/basicinfo',
      selectValue,
      question: question.toJS(),
      fields: fields.toJS(),
      dynamicFields,
      form,
      initialValues: Object.assign({}, formObject, initialValues),
    }

    return result;
  }
);


export const riskSelector = createSelector(
  dataSelector,
  selectValueSelector,
  formSelector,
  (data, selectValue, form) => {
    const riskValue = form.risk && form.risk.crysis2008 ? form.risk.crysis2008.value : null;
    return {
      title: data.getIn(['Invest', 0, 'title']),
      description: data.getIn(['Invest', 0, 'description']),
      question: data.getIn(['Invest', 0, 'questions', 0]).toJS(),
      nextLink: '/survey/bundle',
      prevLink: '/survey/employment',
      selectValue,
      riskValue,
      riskForm: form.risk,
    }
  }
);

export const bundleSelector = createSelector(
  bundleStateSelector,
  termsAcceptedSelector,
  formSelector,
  (bundle, termsAccepted, form) => {
    const riskValue = form.risk && form.risk.crysis2008 ? form.risk.crysis2008.value : null;
    const val = form.employment && form.employment.annual_income ? form.employment.annual_income.value.replace(/[,\$\s]/g, '') : 0;
    return {
      ...bundle,
      termsAccepted,
      nextLink: '/survey/banks',
      prevLink: '/survey/risks',
      employeeIncome: parseInt(val),
    }
  }
);

export const checkSelector = createSelector(
  dataSelector,
  formSelector,
  (data, form) => {
    return {
      questions: data.getIn(['Fund', 2, 'questions']).toJS(),
      nextLink: '/survey/docusign',
      prevLink: '/survey/banks',
      checkForm: form.check,
      value: form.check && form.check.typeOfAccount ? form.check.typeOfAccount.value : '',
    }
  }
)

export const transferSelector = createSelector(
  dataSelector,
  formSelector,
  (data, form) => {
    const formDataExists = form && form.basicinfo ? true : false;
    return {
      firstName: formDataExists ? form.basicinfo.first_name.value : '',
      lastName: formDataExists ? form.basicinfo.last_name.value : '',
      address: formDataExists ? form.basicinfo.address.value : '',
      city: formDataExists ? form.basicinfo.city.value : '',
      state: formDataExists ? form.basicinfo.state.value : '',
      zipCode: formDataExists ? form.basicinfo.zip_code.value : '',
      prevLink: '/survey/banks',
      nextLink: '/survey/docusign',
    }
  }
);

export const accountsSelector = createSelector(
  plaidSelector,
  formSelector,
  (plaid, form) => {
    return {
      accounts: plaid.accounts,
      plaidForm: form.plaid,
      value: form && form.plaid && form.plaid.plaid_account_id ? form.plaid.plaid_account_id.value : '',
    }
  }
)

export const docusignPageSelector = createSelector(
  docusignSelector,
  (docusign) => {
    return {...docusign}
  }
)
