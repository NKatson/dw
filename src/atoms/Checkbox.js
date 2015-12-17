import React, { PropTypes } from 'react';
import { Checkbox as _Checkbox } from 'react-icheck';

class Checkbox extends React.Component {
  render() {
    const { label, handleClick, checked } = this.props;
    return <_Checkbox
          onClick={handleClick}
          defaultChecked={checked ? true : false}
          checkboxClass="icheckbox_minimal"
          className="chbx-styled"
          increaseArea="20%"
          label={label}
        />;
  }
}

Checkbox.propTypes = {
  handleToggle: PropTypes.func,
  handleCheck: PropTypes.func,
  id: PropTypes.string,
  checked: PropTypes.bool,
}

export default Checkbox;
