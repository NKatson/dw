import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { isLast, isActive, title } = this.props;
    const component =   <div class={'wfm-step' + (isActive ? ' active' : '')}>
          <div class="wfm-step__text">{title}</div>
      </div>;
    return (
      {component}
    );
  }
}

Category.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
};

export default Category;
