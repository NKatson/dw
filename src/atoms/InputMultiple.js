import React, { PropTypes } from 'react'

class InputMultiple extends React.Component {
  render () {
    const { question : { htmlName, class: additionalClass, type, label }, handleClick, inputs } = this.props;
    return (
      <div className={'input-wrap ' + additionalClass}>
        <p><b>{label}</b></p>
        {inputs.map((input, index) => {
          let iProps = {
            type: type ? type : 'radio',
            name: htmlName,
            value: input.value,
          };

          if (handleClick) {
            iProps.onClick = handleClick;
          }
          return (
              <p className="radio-chbx-wrap" key={input.label}>
              <label><input  {...input.field} {...iProps}  defaultChecked={input.defaultChecked ? true : false} /> {input.label}</label>
              </p>
          );
        })}
      </div>
    );
  }
}

InputMultiple.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string.isRequired,
    htmlName: PropTypes.string,
    class: PropTypes.string,
    label: PropTypes.string,
  }),
  handleClick: PropTypes.func,
  inputs: PropTypes.arrayOf(PropTypes.shape({
     label: PropTypes.string.isRequired,
     field: PropTypes.object.isRequired,
     value: PropTypes.string,
     defaultChecked: PropTypes.bool,
 })).isRequired,
}

export default InputMultiple;
