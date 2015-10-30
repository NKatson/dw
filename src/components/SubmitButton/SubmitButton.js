import React, { PropTypes } from 'react';

class SubmitButton extends React.Component {
  formIsValid() {
    const fields = this.props.fields;
    const formValid = Object.keys(fields).reduce((prev, cur) => {
      let error = fields[cur].error ? 0 : 1;
      let value = fields[cur].value && fields[cur].value.length > 0 ? 1 : 0;

      return prev * error * value;
    }, 1);

    return formValid;
  }
  render() {
    const {className = 'btn btn_blue w-308', handleSubmit, text} = this.props;
    return (
      <button
        className={className}
        onClick={handleSubmit}
        disabled={::this.formIsValid() ? false : true}
      >{text}</button>
    );
  }
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
