import React, { PropTypes } from 'react'

class InputMultiple extends React.Component {
  render () {
    const {htmlName, additionalClass, handleClick, type, inputs } = this.props;
    return (
      <div className={'input-wrap ' + additionalClass}>
        {inputs.map(input => {
          return (
              <p className="radio-chbx-wrap">
                <input
                  {...input.field}
                  type={type ? type : 'radio'}
                  name={htmlName}
                  value={input.value}
                  onClick={handleClick}
                /> <label>{input.label}</label>
              </p>
          );
        })}
      </div>
    );
  }
}

InputMultiple.propTypes = {
  type: PropTypes.string.isRequired,
  htmlName: PropTypes.string,
  additionalClass: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape({
     label: PropTypes.string.isRequired,
     field: PropTypes.object.isRequired,
     value: PropTypes.string.isRequired,
 })).isRequired,
}

export default InputMultiple;
