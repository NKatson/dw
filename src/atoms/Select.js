import React, { PropTypes } from 'react'

class Select extends React.Component {
  render() {
    const { options, additionalClass, label, handleChange, placeholder, field, defaultValue } = this.props;

    return (
      <div className={'input-wrap ' + additionalClass}>
        {label ? <p><b>{label}</b><br /></p> : null}
        <select className="input-text" {...field} onChange={handleChange}>
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
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
     value: PropTypes.string.isRequired,
     label: PropTypes.string.isRequired,
     selected: PropTypes.string
 })).isRequired,
}

export default Select;
