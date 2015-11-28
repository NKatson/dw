import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';

class InputText extends React.Component {
  maskedChange(e) {
    console.log('masked!');
  }
  render () {
    const { field, placeholder, additionalClass, icon, type, isNormalized , label, defaultValue, maskPattern } = this.props;
    const mask = maskPattern || '111-111-1111';
    const isIncome = field.name.substr(field.name.length - 6, field.name.length - 1) === 'income';
    let component = null;

    if (isNormalized && !isIncome && type !== 'password') {
      component = <MaskedInput
        className="input-text" 
        mask={mask}
        placeholder={placeholder}
        value={defaultValue ? defaultValue : ""}
        {...field} 
        />;
    } else {
      component =  <input
        className="input-text"
        defaultValue={defaultValue ? defaultValue : ""}
        placeholder={placeholder}
        {...field}
        />
    }

    if (isIncome) {
      component = <CurrencyMaskedInput
                    placeholder="0"
                    autoFocus={defaultValue ? true : false}
                    required
                    {...field}
                    className="text full-width"
                    type="text"
                    pattern="\d.*"
                    defaultValue={defaultValue ? defaultValue : ""}
                  />;
    }

    return (
        <div className={'input-wrap ' + (additionalClass ? additionalClass : '') + (field.error && field.touched ? ' error' : '')}>
          {label ? <p><b>{label}</b><br /></p> : null}
          {component}
          {
            field.error && field.touched ?
              <div className="login-form__error-msg">{field.error}</div>
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
