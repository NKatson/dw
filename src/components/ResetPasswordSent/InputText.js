import React, { PropTypes } from 'react'

class InputText extends React.Component {
  render () {
    const {field, fields} = this.props;
    return <div key={field.name}>
        <label>{field.label}</label>
        <input type={field.type}  {...fields[field.name]} placeholder={field.placeholder}/>
      </div>
  }
}

export default InputText;
