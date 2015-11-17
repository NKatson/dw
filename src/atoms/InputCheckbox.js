import React, { PropTypes } from 'react'

class InputCheckbox extends React.Component {
  render () {
    const {field, label, htmlName, additionalClass} = this.props;
    return (
      <div className={'input-wrap ' + additionalClass}>
        <input type="checkbox" id="showSSN" name={htmlName} {...field} /> <label htmlFor="showSSN">{label}</label>
      </div>
    );
  }
}

InputCheckbox.propTypes = {
  field: PropTypes.object,
  label: PropTypes.string.isRequired,
  htmlName: PropTypes.string.isRequired,
  additionalClass: PropTypes.string.isRequired,
}

export default InputCheckbox;
