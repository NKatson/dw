import React, { PropTypes } from 'react';

class Category extends React.Component {
  render() {
    const { isLast, isCompleted, title, index } = this.props;
    const categories = [
      <p>Tell us <br /> about you</p>,
      <p>Set up <br /> your account</p>,
      <p>Fund <br /> your account</p>,
      <p>Confirm <br /> and go!</p>,]
    return (
      <div className={'wfm-step' + (isCompleted ? ' current' : '')}>
        <div className="wfm-step__num">{index}</div>
        <div className="wfm-step__text">{categories[index - 1]}</div>
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
