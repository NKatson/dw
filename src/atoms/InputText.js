import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';

class InputText extends React.Component {
  maskedChange(e) {
    console.log('masked!');
  }
  render () {
    const { field, placeholder, additionalClass, icon, type, isNormalized , label, defaultValue } = this.props;
    let mask = '111-111-1111';
    const isIncome = field.name.substr(field.name.length - 6, field.name.length - 1) === 'income';
    let component = null;

    if (field.name === 'date_of_birth') {
      mask = '11/11/1111';
    } else if (field.name === '_ssn') {
      mask = '111-11-1111';  
      //field.value = '123-__-____';
    }

    if (!field.value && defaultValue) {
      field.value = defaultValue;
    }

    if (isNormalized && !isIncome && type !== 'password') {
      component = <MaskedInput
        size={3}
        mask={mask}
        type={type ? type : 'text'}
        placeholder={placeholder}
        className="text full-width" {...field} />;
    } else {
      component =  <input
        type={type ? type : 'text'}
        className="text full-width"
        placeholder={placeholder}
        {...field}
        defaultValue={defaultValue ? defaultValue : ""}
        />
    }

    if (isIncome) {
      component = <CurrencyMaskedInput
                    placeholder="0"
                    required
                    {...field}
                    className="text full-width"
                    type="text"
                    pattern="\d.*"
                    defaultValue={defaultValue ? defaultValue : ""}
                  />;
    }

    // Additional class hardcode
    let addClass = '';
    if (placeholder === 'Zip Code') {
      addClass = 'inline-block w-210';
    }
    if (placeholder === 'Phone') {
      addClass = 'w-342 inline-block valign-mid';
    }
    if (placeholder === 'SSN') {
      addClass = 'w-342 inline-block valign-mid';
    }
    if (placeholder === 'Date of Birth (MM/DD/YYYY)') {
      addClass = 'w-342';
    }
    return (
        <div className={'input-wrap ' + addClass + (icon ? ' input-wrap_with-icon ' : '') + (field.error && field.touched ? ' input-wrap_error' : '')}>
          {icon ? <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div> : null}
          {label ? <p><b>{label}</b><br /></p> : null}
          {component}
          {
            field.error && field.touched ?
              <div className="input-wrap__error-msg">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                 {field.error}
              </div>
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
