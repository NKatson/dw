import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';
import CurrencyMaskedInput from 'react-currency-masked-input';

class SsnInput extends React.Component {
  componentWillMount() {
    const { showSsn, handleShowSsnClick } = this.props;
    if (showSsn) {
      handleShowSsnClick();
    }
  }
  componentWillUnmount() {
    const { showSsn, handleShowSsnClick } = this.props;
    if (showSsn) {
      handleShowSsnClick();
    }
  }
  render () {
    const { showSsn, field } = this.props;
    return (
        <div className={'input-wrap w-230 pad-03' + (field.error && field.touched ? ' error' : '')}>
          <MaskedInput
            mask="111-11-1111"
            type={showSsn ? 'text' : 'password'}
            placeholder="Social Security Number"
            className="input-text"
            {...field}
             />
           { field.error && field.touched ? <div className="input-wrap__error-msg">{field.error}</div>  : null }
        </div>
    );
  }
}

SsnInput.propTypes = {
  field: PropTypes.object,
  showSsn: PropTypes.bool,
}

export default SsnInput;
