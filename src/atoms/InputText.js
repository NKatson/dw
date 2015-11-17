import React, { PropTypes } from 'react';

class InputText extends React.Component {
  render () {
    const { field, placeholder, additionalClass, icon, type } = this.props;
    return (
        <div className={'input-wrap ' + additionalClass + (icon ? ' input-wrap_with-icon ' : '') + (field.error && field.touched ? ' input-wrap_error' : '')}>
          {icon ? <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div> : null}
          <input type={type ? type : 'text'} className="text full-width" placeholder={placeholder} {...field} />
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
}

export default InputText;
