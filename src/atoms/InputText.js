import React, { PropTypes } from 'react';
import MaskedInput from 'react-maskedinput';

class InputText extends React.Component {
  render () {
    const { field, placeholder, additionalClass, icon, type, isNormalized , label, parentValue, stateSelectValue } = this.props;
    let mask = '111-111-1111';
    console.log(stateSelectValue);
    console.log(parentValue);

    // @TODO
    if (field.name === 'ssn') {
    }

    let needDisplay = false;
    if (parentValue) {
      needDisplay = stateSelectValue === parentValue ? true : false;
    } else {
      needDisplay = true;
    }

    if (field.name === 'dateOfBirth') {
      mask = '11/11/1111';
    } else if (field.name === 'ssn') {
      mask = '111-11-111';
    }

    return (
        <div style={{display: needDisplay ? 'block': 'none'}} className={'input-wrap ' + additionalClass + (icon ? ' input-wrap_with-icon ' : '') + (field.error && field.touched ? ' input-wrap_error' : '')}>
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
  parentValue: PropTypes.string,
  stateSelectValue: PropTypes.string,
}

export default InputText;
