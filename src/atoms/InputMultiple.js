import React, { PropTypes } from 'react'

class InputMultiple extends React.Component {
  render () {
    const {htmlName, additionalClass, handleClick, type, inputs } = this.props;
    return (
      <div className={'input-wrap ' + additionalClass}>
        {inputs.map(input => {
          let iProps = {
            type: type ? type : 'radio',
            name: htmlName,
            value: input.value,
          }
          if (handleClick) {
            iProps.onClick = handleClick;
          }
          return (
              <p className="radio-chbx-wrap">
                <input  {...input.field} {...iProps} /> 
              <label>{input.label}</label>
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
  handleClick: PropTypes.func,
  inputs: PropTypes.arrayOf(PropTypes.shape({
     label: PropTypes.string.isRequired,
     field: PropTypes.object.isRequired,
     value: PropTypes.string,
 })).isRequired,
}

export default InputMultiple;
