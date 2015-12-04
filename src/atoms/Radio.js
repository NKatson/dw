import React, { PropTypes } from 'react';

class Radio extends React.Component {
  render() {
    const { text, imagePath, description, isChecked, handleClick } = this.props;
    return (
      <label className={'btn tell-us-block__choise' + (isChecked ? ' active' : '')}>
          <input type="radio" name="options" autoComplete="off" onClick={handleClick} value={text}  />
          {
            imagePath ? <img src={imagePath} className="tell-us-block__choise-img" /> : null
          }
          <div className="tell-us-block__choise-title"><span className="wfm-radio"></span> {text}</div>
          <div className="tell-us-block__choise-text">{description}</div>
      </label>
    );
  }
}

Radio.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
  imagePath: PropTypes.string,
  description: PropTypes.string,
};

export default Radio;
