import React, { PropTypes } from 'react'

class Select extends React.Component {
  render() {
    const { options, additionalClass } = this.props;
    return (
      <div className={'input-wrap ' + additionalClass}>
        <select className="full-width">
          {options.map((option, index) => {
            return <option value={option.value} key={option.value}>{option.label}</option>;
          })}
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  additionalClass: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
     value: PropTypes.string.isRequired,
     label: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
 })).isRequired,
}

export default Select;
