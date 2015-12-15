import React, { PropTypes } from 'react'

class Select extends React.Component {
  render() {
    const { options, additionalClass, label, handleChange, field, stateSelectValue } = this.props;
    let additionalProps = {};
    if (handleChange) {
      additionalProps.onChange = handleChange;
      additionalProps.value = stateSelectValue ? stateSelectValue : field.value;
    }
    return (
      <div className={'input-wrap ' + additionalClass + (field.error && field.touched ? ' error' : '')}>
        {label ? <div className="input-wrap__text">{label}</div> : null}
        {
          field.error && field.touched ?
            <div className="input-wrap__error-msg">{field.error}</div>
            : null
        }
        <select className="input-text" {...field} {...additionalProps}>
          <option key='default' value='default'>Choose One</option>
          {options.map((option, index) => {
            return <option key={option.value+""} value={option.label+""}>{option.label}</option>;
          })}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  additionalClass: PropTypes.string,
  label: PropTypes.string,
  stateSelectValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
     value: PropTypes.string.isRequired,
     label: PropTypes.string.isRequired,
     selected: PropTypes.string
 })).isRequired,
}

export default Select;
