import React, { PropTypes } from 'react';

class InputText extends React.Component {
  render () {
    const { field, placeholder } = this.props;
    return (
        <input type="text" className="text full-width" placeholder={placeholder} {...field} />
    );
  }
}

InputText.propTypes = {
  field: PropTypes.object,
  placeholder: PropTypes.string,
}

export default InputText;
