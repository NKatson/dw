import React, { PropTypes } from 'react';

class Checkbox extends React.Component {
  componentDidMount() {
    require('icheck');
    $('input.chbx-styled').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%'
    });
    const that = this;
    $('input').on('ifToggled', function(e) {
      that.props.handleToggle();
    });
  }
  render() {
    const { handleToggle, id, checked } = this.props;
    let addProps = {};
    if (typeof checked !== 'undefiend') {
      addProps.checked = checked;
    }
    return <input
      {...addProps}
      type="checkbox"
      onClick={handleToggle}
      className="chbx-styled"
      id={id} />
  }
}

Checkbox.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default Checkbox;
