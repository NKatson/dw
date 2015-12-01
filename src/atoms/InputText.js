import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';
import $ from 'jquery';

class InputText extends React.Component {
  componentDidMount() {
    require('autonumeric');
    $('input[name="annual_income"]').autoNumeric('init', {
       aSign: '$ ',
       aPad: false
    });
  }
  render () {
    const { field, placeholder, additionalClass, icon, type, isNormalized ,
      label, defaultValue, maskPattern, errorMessageClass, inputClass } = this.props;
    const mask = maskPattern || '111-111-1111';
    const isIncome = field.name.substr(field.name.length - 6, field.name.length - 1) === 'income';
    let component = null;

    if (isNormalized && !isIncome && type !== 'password') {
      component = <MaskedInput
        className="input-text"
        mask={mask}
        placeholder={placeholder}
        type={type ? type : 'text'}
        value={defaultValue ? defaultValue : ""}
        {...field}
        />;
    } else {
      component =  <input
        className={'input-text ' + (inputClass ? inputClass : '')}
        placeholder={placeholder}
        type={type ? type : 'text'}
        {...field}
        />
      }
    
    if (isIncome) {
      component =  <input
        className={'input-text ' + (inputClass ? inputClass : '')}
        placeholder="$"
        type="text"
        {...field}
        />
    }
    return (
        <div className={'input-wrap ' + (additionalClass ? additionalClass : '') + (field.error && field.touched ? ' error' : '')}>
          {label ? <div className="input-wrap__text">{label}</div> : null}
          {component}
          {
            field.error && field.touched ?
              <div className={errorMessageClass ? errorMessageClass : 'input-wrap__error-msg' }>{field.error}</div>
              : null
          }
        </div>
    );
  }
}

InputText.propTypes = {
  field: PropTypes.object,
  placeholder: PropTypes.string,
  additionalClass: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
}

export default InputText;
