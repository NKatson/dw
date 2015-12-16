import React, { PropTypes } from 'react';
import $ from 'jquery';

class InputMultiple extends React.Component {
  componentDidMount() {
    require('icheck');
    $('input.chbx-styled').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%'
    });
    const that = this;
    $('input').on('ifChecked', function(e) {
      that.props.handleClick(e.target.name, e.target.value);
    });
  }
  render () {
    const { question : { name, label }, handleClick, inputs, selectedValue } = this.props;
    return (
      <div className="anketa-form__fieldset">
        {name === 'crysis2008' ? null : <p>{label}</p> }
        {inputs.map((input, index) => {
          let iProps = {
            id: 'option-'  + index,
            className: 'chbx-styled',
            type: 'radio',
            value: input.value,
          };
          if (handleClick) {
            iProps.onClick = handleClick;
          }
          if (name) {
            iProps.name = name;
          }

          return (
            <div className="input-wrap input-wrap_with-radio" key={input.label}>
              <input {...input.field} {...iProps} checked={input.value == selectedValue ? true : false} />
              <label htmlFor={'option-' + index}><span className="common-form__label-title">{input.label}</span>
              {input.balance ? <span className="common-form__label-text">${input.balance}</span> : null}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

InputMultiple.propTypes = {
  question: PropTypes.shape({
    class: PropTypes.string,
    label: PropTypes.string,
    balance: PropTypes.string,
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
