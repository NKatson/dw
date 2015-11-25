import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';

class SsnInput extends React.Component {
  maskedChange(e) {
    console.log('masked!');
  }
  render () {
    const { field, type } = this.props;
    let mask = '111-11-1111';
    // field.value = '123-__-____';
    let component;
    if (type !== 'password') {
      component = <MaskedInput
        mask={mask}
        type={type ? type : 'text'}
        placeholder="SSN"
        className="text full-width" {...field} />;
    } else {
      component = <input
        type={type ? type : 'text'}
        className="text full-width"
        placeholder="SSN"
        {...field}
        />
    }

    return (
        <div className={'input-wrap w-342 inline-block valign-mid ' + (field.error && field.touched ? ' input-wrap_error' : '')}>
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

SsnInput.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
}

export default SsnInput;
