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
    const {
      className = 'btn btn_yellow btn_blue-text',
      handleSubmit,
      pending,
      text,
    } = this.props;
    return (
      <button
        className={className}
        onClick={handleSubmit}
        disabled={::this.formIsValid() ? false : true}
      > {pending ?
        <div className="spinner la-ball-spin-clockwise">
          <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
           <div></div>
        </div> : text}
        <span className="wfm-i wfm-i-arr-right-blue"></span>
       </button>
    );
  }
}

SubmitButton.propTypes = {
  className: PropTypes.string,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
