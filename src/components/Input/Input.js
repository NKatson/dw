import React, { PropTypes } from 'react'

class Input extends React.Component {
  render() {
    const {field, type, placeholder, icon} = this.props;
    return (
      <div className={'input-wrap input-wrap_with-icon' + (field.error && field.touched ? ' input-wrap_error' : '')}>
          <div className="input-wrap__icon"><span aria-hidden="true" className={'glyphicon ' + icon }></span></div>
          <input type={type} className="text full-width" placeholder={placeholder} {...field} />
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

Input.propTypes = {
  field: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Input;
