import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';

class InputText extends React.Component {
  render () {
    const { field, placeholder, additionalClass, icon, type, isNormalized , label } = this.props;
    let mask = '111-111-1111';

    if (field.name === 'ssn') {
    }

    if (field.name === 'dateOfBirth') {
      mask = '11/11/1111';
    } else if (field.name === 'ssn') {
      mask = '111-11-111';
    }

    return (
        <div className={'input-wrap ' + additionalClass + (icon ? ' input-wrap_with-icon ' : '') + (field.error && field.touched ? ' input-wrap_error' : '')}>
          {icon ? <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div> : null}
          {label ? <p><b>{label}</b><br /></p> : null}
              {isNormalized ?
                <MaskedInput mask={mask} name="card" placeholder={placeholder} className="text full-width" {...field}/>
              : <input type={type ? type : 'text'} className="text full-width" placeholder={placeholder} {...field} /> }
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
  additionalClass: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
}

export default InputText;
