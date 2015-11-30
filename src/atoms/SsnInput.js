import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';

class SsnInput extends React.Component {
  render () {
    const { onSsnChange, storedSsn, showSsn, ssnError, field } = this.props;
    let mask = '111-11-1111';
    let component;
    const commonProps = {
      placeholder: "Social security number",
      className: "input-text",
      value: storedSsn
    };

    if (showSsn) {
      component = <MaskedInput
        mask={mask}
        type="text"
        {...commonProps}
        onChange={(e) => {
              const _ssnRegex = /(^[\d_]{3})-([\d_]{2})-([\d_]{4}$)/i;
              const [, s1, s2, s3] = (_ssnRegex.exec(e.target.value) || []).map((elem) => {
                 return /\d+/.exec(elem) ? /\d+/.exec(elem)[0] : "";
              }) || [];
              onSsnChange(s1 ? `${s1}${s2}${s3}` : "");
        }}
         />;
    } else {
      component = <input
        maxLength="9"
        type="password"
        {...commonProps}
        onKeyDown={(e) => {
          const allowed = [37, 38, 39, 40, 8];
          if ((e.keyCode < 48 || e.keyCode > 57) && allowed.indexOf(e.keyCode) === -1) {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          onSsnChange(e.target.value ? e.target.value : "");
        }}
        />
    }
    
    let resSsnError = ssnError;
    if (field.error && field.touched && storedSsn === '')  {
      resSsnError = field.error;
    }

    return (
        <div className={'input-wrap w-230 pad-03' + (resSsnError ? ' error' : '')}>
          {component}
          { resSsnError ? <div className="input-wrap__error-msg">{resSsnError}</div>  : null }
        </div>
    );
  }
}

SsnInput.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
}

export default SsnInput;
