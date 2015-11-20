import React, { PropTypes } from 'react'

class Select extends React.Component {
  render() {
    const { options, additionalClass, label, field, handleChange } = this.props;
    console.log(field.error);
    return (
      <div className={'input-wrap ' + additionalClass}>
        {label ? <p><b>{label}</b><br /></p> : null}
        <select className="full-width dropdown" {...field}>
          <option key='default'>Choose One</option>
          {options.map((option, index) => {
            return <option  key={option.value} value={option.value}>{option.label}</option>;
          })}
        </select>
        {
          field.error ? 
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

Select.propTypes = {
  additionalClass: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  field: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
     value: PropTypes.string.isRequired,
     label: PropTypes.string.isRequired,
 })).isRequired,
}

export default Select;
