import React, { PropTypes } from 'react';
import { RadioGroup, Radio } from 'react-icheck';

class InputMultiple extends React.Component {
  render () {
    const { question, handleClick, inputs, field, value } = this.props;
    return (
      <div>
        <p>{question.label}</p>
        <RadioGroup name={question.name}  className="input-wrap_with-radio-2" value={value ? value : ''}>
          {
            inputs.map((input, index) => {
              const label = <label htmlFor={'option-' + index}><span className="common-form__label-title">{input.label}</span>
                              {input.balance ? <span className="common-form__label-text">${input.balance}</span> : null}
                            </label>;
              return (
                  <Radio
                      className="radio-component-classname"
                      {...field}
                      onClick={(e) => {
                        field.onChange(e);
                      }}
                      key={'option' + index}
                      id={'option-' + index}
                      radioClass="iradio_minimal"
                      increaseArea="20%"
                      value={input.value}
                      label={label}
                    />
              );
            })
          }
        </RadioGroup>
      </div>
    );
  }
}

InputMultiple.propTypes = {
  field: PropTypes.object.isRequired,
  question: PropTypes.shape({
    class: PropTypes.string,
    label: PropTypes.string,
    balance: PropTypes.string,
  }),
  handleClick: PropTypes.func,
  inputs: PropTypes.arrayOf(PropTypes.shape({
     label: PropTypes.string.isRequired,
     value: PropTypes.string,
     defaultChecked: PropTypes.bool,
 })).isRequired,
}

export default InputMultiple;
