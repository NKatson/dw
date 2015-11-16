import React, { PropTypes } from 'react'

class Option extends React.Component {
  render() {
    return <option value={this.props.value}>{this.props.label}</option>
  }
}

export default Option;
