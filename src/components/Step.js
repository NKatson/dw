import React, { PropTypes } from 'react';

class Step extends React.Component {
  render() {
    const { text, description } = this.props;
    return (
      <div className="steps-block-item">
        <div className="steps-block-item__pic"></div>
        <h2 className="steps-block-item__title">{text}</h2>
        <div className="steps-block-item__text">{description}</div>
      </div>
    );
  }
}

Step.propTypes = {
  text: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Step;
