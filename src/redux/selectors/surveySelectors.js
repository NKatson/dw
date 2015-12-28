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

export const surveySelector = createSelector(
  dataSelector,
  showCategoriesSelector,
  categoryIndexSelector,
  isDocusignSelector,
  showWelcomeBackSelector,
  (data, showCategories, categoryIndex, isDocusign, showWelcomeBack) => {
    const categories = Object.keys(data.toJS()).map(v => v.toLowerCase());
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
      showWelcomeBack,
      firstName: data.getIn(['Personal', 0, 'questions', 0, 'defaultValue']),
    }
  }
);

export const personalSelector = createSelector(
  dataSelector,
  showSsnSelector,
  (data, showSsn) => {
    return {
      questions: data.getIn(['Personal', 0, 'questions']).toJS(),
      title: data.getIn(['Personal', 0, 'title']),
      description: data.getIn(['Personal', 0, 'description']),
      nextLink: '/survey/employment',
      prevLink: '/welcome',
      showSsn,
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

    return {
      title: data.getIn(['Personal', 1, 'title']),
      description: data.getIn(['Personal', 1, 'description']),
      nextLink: '/survey/risks',
      prevLink: '/survey/basicinfo',
      selectValue,
      question: question.toJS(),
      fields: fields.toJS(),
      dynamicFields,
      form,
    }
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
      riskForm: form.risk
    }
  }
);

export const bundleSelector = createSelector(
  bundleStateSelector,
  termsAcceptedSelector,
  (bundle, termsAccepted) => {
    return {
      ...bundle,
      termsAccepted,
      nextLink: '/survey/banks',
      prevLink: '/survey/risks',
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
    }
  }
)

export const transferSelector = createSelector(
  dataSelector,
  formSelector,
  (data, form) => {
    const formDataExists = form && form.basicinfo ? true : false;
    return {
      firstName: data.getIn(['Personal', 0, 'questions', 0, 'defaultValue']),
      lastName: data.getIn(['Personal', 0, 'questions', 1, 'defaultValue']),
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
    }
  }
)

export const docusignPageSelector = createSelector(
  docusignSelector,
  (docusign) => {
    return {...docusign}
  }
)
