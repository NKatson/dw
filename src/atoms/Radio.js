import React, { PropTypes } from 'react';
import { Radio as _Radio } from 'react-icheck';

class Radio extends React.Component {
  render() {
    const { label, value, handleClick } = this.props;
    return <_Radio
          onClick={handleClick}
          label={label}
          value={value}
          radioClass="iradio_minimal"
          increaseArea="20%"
        />;
  }
}

Radio.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
}

export default Radio;
