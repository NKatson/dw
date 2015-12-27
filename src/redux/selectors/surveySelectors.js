import { createSelector } from 'reselect';

const dataSelector = state => state.survey.get('data');
const categorySelector = state => state.survey.get('category');
const categoryIndexSelector = state => state.survey.get('categoryIndex');
const stepSelector = state => state.survey.get('step');
const isDocusignSelector = state => state.docusign.isDocusign;
const showCategoriesSelector = state => state.survey.get('showCategories');

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
)