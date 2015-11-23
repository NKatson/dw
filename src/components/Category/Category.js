import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { isLast, isCompleted, title } = this.props;
    return (
      <div className={'wfm-step' + (isCompleted ? ' active' : '')}>
        <div className="wfm-step__text">{title}</div>
      </div>
    );
  }
}

Category.propTypes = {
  isCompleted: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};

export default Category;
