import React, { PropTypes } from 'react';
import { CategoryDivider } from '../atoms';

class Category extends React.Component {
  render() {
    const { category, currentCategoryIndex } = this.props;
    const categories = [
      <p>Tell us <br /> about you</p>,
      <p>Set up <br /> your account</p>,
      <p>Fund <br /> your account</p>,
      <p>Confirm <br /> and go!</p>,
      ];
    return (
      <div style={{display: 'inline'}}>
        <div className={'wfm-step' + (category.isCompleted ? ' current' : '')}>
          <div className="wfm-step__num">{category.index + 1}</div>
          <div className="wfm-step__text">{categories[category.index]}</div>
        </div>
        {category.isLast ? null : <CategoryDivider isPassed={category.index < currentCategoryIndex} />}
      </div>
    );
  }
}

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired,
  }),
  currentCategoryIndex: PropTypes.number.isRequired,
};

export default Category;
