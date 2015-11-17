import React, { PropTypes } from 'react'

class Select extends React.Component {
  render() {
    const { options } = this.props;
    return (
        <select className="full-width">
          {options.map((option, index) => {
            return <option value={option.value} key={option.value}>{option.label}</option>;
          })}
        </select>
    );
  }
}

Select.propTypes = {
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
     value: React.PropTypes.string.isRequired,
     label: React.PropTypes.string.isRequired,
     name: React.PropTypes.string.isRequired,
 })).isRequired,
}

export default Select;
