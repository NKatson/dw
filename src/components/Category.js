import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { isLast, isCompleted, title, index } = this.props;
    return (
      <div className={'wfm-step' + (isCompleted ? ' current' : '')}>
        <div className="wfm-step__num">{index}</div>
        <div className="wfm-step__text">{title}</div>
      </div>
    );
  }
}

Category.propTypes = {
  isCompleted: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired
};

export default Category;
