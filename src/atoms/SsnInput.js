import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';

class SsnInput extends React.Component {
  render () {
    const { onSsnChange, storedSsn, showSsn, ssnError } = this.props;
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
        onChange={(e) => {
          onSsnChange(e.target.value ? e.target.value : "");
        }}
        />
    }

    return (
        <div className={'input-wrap w-230 pad-03' + (ssnError ? ' input-wrap_error' : '')}>
          {component}
          { ssnError ?
              <div className="input-wrap__error-msg">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                 {ssnError}
              </div>
              : null
          }
        </div>
    );
  }
}

SsnInput.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
}

export default SsnInput;
