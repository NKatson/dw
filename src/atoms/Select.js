import React, { PropTypes } from 'react'

class Select extends React.Component {
  render() {
    const { options, additionalClass, label, handleChange, placeholder } = this.props;
    // additionalClass hardcode
    let addClass = '';
    if (placeholder === 'State') {
      addClass = 'inline-block pad-04';
    }

    return (
      <div className={'input-wrap ' + addClass}>
        {label ? <p><b>{label}</b><br /></p> : null}
        <select className="full-width dropdown" onChange={handleChange}>
          <option key='default'>Choose One</option>
          {options.map((option, index) => {
            return <option  key={option.value+""}>{option.label}</option>;
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
 })).isRequired,
}

export default Select;
