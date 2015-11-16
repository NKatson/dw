import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { isLast, isActive, title } = this.props;
    const component =   <div class={'wfm-step' + (isActive ? ' active' : '')}>
          <div class="wfm-step__text">{title}</div>
      </div>;
    return (
      {isLast ?
        {component}
       :
       <div>
         {component}
         <div class="wfm-steps__dvdr"></div>
       </div>
     }
    );
  }
}

Category.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isLast: PropTYpes.bool,
};

export default Category;
