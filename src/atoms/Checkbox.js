import React, { PropTypes } from 'react';

class Checkbox extends React.Component {
  componentDidMount() {
    require('icheck');
    $('input.chbx-styled').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%'
    });
    $('input').on('ifToggled', (e) => {
      console.log('toggle');
      this.props.handleToggle();
    });
    $('input').on('ifChecked', (e) => {
      console.log('checked');
      console.log(e.target.name, e.target.value);
    });
  }
  render() {
    const { handleToggle, id, checked, type } = this.props;
    let addProps = {};
    if (typeof checked !== 'undefiend') {
      addProps.checked = checked;
    }
    if (id) {
      addProps.id = id;
    }
    if (handleToggle) {
      addProps.onClick = handleToggle;
    }
    return <input
      {...addProps}
      type={type ? type : 'checkbox'}
      className="chbx-styled"
      />
  }
}

Checkbox.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
}

export default Checkbox;
