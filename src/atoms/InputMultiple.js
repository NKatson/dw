import React, { PropTypes } from 'react'

class InputMultiple extends React.Component {
  render () {
    const { question : { htmlName, label }, handleClick, inputs } = this.props;
    return (
      <div className="anketa-form__fieldset anketa-form__main-fieldset">
        <p className="text-center">{label}</p>
        {inputs.map((input, index) => {
          let iProps = {
            id: input.label,
            className: 'chbx-styled',
            type: 'radio',
            name: htmlName,
            value: input.value,
            defaultChecked: input.defaultChecked ? true : false
          };

          if (handleClick) {
            iProps.onClick = handleClick;
          }
          return (
            <div className="input-wrap input-wrap_with-radio" key={input.label}>
              <input  {...input.field} {...iProps} />
              <label htmlFor={input.label}><span className="common-form__label-title">{input.label}</span></label>
            </div>
          );
        })}
      </div>
    );
  }
}

InputMultiple.propTypes = {
  question: PropTypes.shape({
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
