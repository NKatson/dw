import { createSelector } from 'reselect';

const dataSelector            = state => state.survey.get('data');
const categorySelector        = state => state.survey.get('category');
const categoryIndexSelector   = state => state.survey.get('categoryIndex');
const stepSelector            = state => state.survey.get('step');
const isDocusignSelector      = state => state.docusign.isDocusign;
const showCategoriesSelector  = state => state.survey.get('showCategories');
const showSsnSelector         = state => state.survey.get('showSsn');
const selectValueSelector     = state => state.survey.get('selectValue');
const riskValueSelector       = state => state.form && state.form.risk ? state.form.risk.crysis2008.value : null;

export const categoriesSelector = createSelector(
  dataSelector,
  showCategoriesSelector,
  categoryIndexSelector,
  isDocusignSelector,
  (data, showCategories, categoryIndex, isDocusign) => {
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
  (data, selectValue) => {
    const question = data.getIn(['Personal', 1, 'questions', 0]);  
    const answer = question.get('answers').find(answer => answer.get('value') === selectValue);
    const fields = answer.get('dynamicFields')
                          .map(field => field.get('name'))
                          .unshift(question.get('name'));
    return {
      title: data.getIn(['Personal', 1, 'title']),
      description: data.getIn(['Personal', 1, 'description']),
      nextLink: '/survey/risks',
      prevLink: '/survey/basicinfo',
      selectValue,
      question: question.toJS(),
      fields: fields.toJS(),
      dynamicFields: answer.get('dynamicFields').toJS(),
    }
  }
);


export const riskSelector = createSelector(
  dataSelector,
  selectValueSelector,
  riskValueSelector,
  (data, selectValue, riskValue) => {
    return {
      title: data.getIn(['Invest', 0, 'title']),
      description: data.getIn(['Invest', 0, 'description']),
      question: data.getIn(['Invest', 0, 'questions', 0]).toJS(),
      nextLink: '/survey/basicinfo',
      prevLink: '/survey/employment',
      selectValue,
      riskValue,
    }
  }
)















