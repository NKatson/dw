import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { isLast, isActive, title, key } = this.props;
    return (
      <div className={'wfm-step' + (isActive ? ' active' : '')} key={key}>
        <div className="wfm-step__text">{title}</div>
      </div>
    );
  }
}

Category.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  key: PropTypes.string.isRequired,
};

export default Category;
