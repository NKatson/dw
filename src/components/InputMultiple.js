import React, { PropTypes } from 'react';
import { RadioGroup, Radio } from '../../lib/react-icheck';

class InputMultiple extends React.Component {
  render () {
    const { question : { name, label }, handleClick, inputs, selectedValue } = this.props;
    const props = {};
    if (handleClick) {
      props.onClick = handleClick;
    }
    return (
      <RadioGroup name={name} value={selectedValue}>
        {
          inputs.map((input, index) => {
            const label = <label htmlFor={'option-' + index}><span className="common-form__label-title">{input.label}</span>
                            {input.balance ? <span className="common-form__label-text">{input.balance}</span> : null}
                          </label>;
            return (
                <Radio
                    {...input.field}
                    {...props}
                    labelWrapperClass="input-wrap input-wrap_with-radio"
                    key={'option' + index}
                    id={'option-' + index}
                    radioClass="iradio_minimal"
                    increaseArea="20%"
                    value={input.value}
                    label={input.label}
                  />
            );
          })
        }
      </RadioGroup>
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
