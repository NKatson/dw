import React, { PropTypes } from 'react'

class InputText extends React.Component {
  render () {
    const {field, type, index, label, htmlName} = this.props;
    return <div key={field.name + '-' + index}>
        <label>{label}</label>
        <input type={type}  {...field} name={htmlName}/>
      </div>
  }
}

export default InputText;
