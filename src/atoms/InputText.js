import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import { CurrencyInput } from '../components';
import $ from 'jquery';

class InputText extends React.Component {
  render () {
    const { field, placeholder, additionalClass, icon, type, isNormalized ,
      label, defaultValue, maskPattern, errorMessageClass, inputClass, isCurrency, tabIndex, disable } = this.props;
    const mask = maskPattern || '111-111-1111';
    const isIncome = field ? field.name.substr(field.name.length - 6, field.name.length - 1) === 'income'
    || field.name === 'initial_fund' || field.name === 'amountOfTransaction' : false;
    let component = null;
    const disabled = ['first_name', 'last_name'];

    if (tabIndex) {
      field.tabIndex = tabIndex;
    }

    if (isNormalized && !isIncome && type !== 'password') {
      component = <MaskedInput
        className="input-text"
        defaultValue={defaultValue}
        mask={mask}
        placeholder={placeholder}
        type={type ? type : 'text'}
        {...field}
        autoComplete="off"
        />;
    } else {
      component =  <input
        disabled={disable}
        autoFocus={defaultValue ? true : false}
        className={'input-text ' + (inputClass ? inputClass : '')}
        placeholder={placeholder}
        type={type ? type : 'text'}
        value={field && field.value ? '' : defaultValue}
        {...field}
        autoComplete="off"
        />
      }

    if (isIncome || isCurrency) {
      component =  <CurrencyInput
        className={'input-text ' + (inputClass ? inputClass : '')}
        placeholder="$"
        type="text"
        {...field}
        />
    }
    const needError = field && field.error && field.touched ? true : false;
    return (
        <div className={'input-wrap ' + (additionalClass ? additionalClass : '') + (needError ? ' error' : '') + (needError && field && field.error.length > 34 ? ' error_two-lines' : '')}>
          {label ?
            <div className="input-wrap__text">{label} {field && field.name === 'annual_income'? <p style={{
                display: 'inline',
                fontSize: '0.8em'
              }}>Your annual income</p> : null}</div>
             : null}

          {component}
          {this.props.children}
          {
            field && field.error && field.touched ?
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
  defaultValue: PropTypes.string,
  additionalClass: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  tabIndex: PropTypes.string,
}

export default InputText;
