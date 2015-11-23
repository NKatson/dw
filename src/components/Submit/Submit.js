import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as api from '../../utils/apiClient';

class Submit extends React.Component {
  processInner(formData, step, result) {
    let qResult = {};
    for (let key in formData[step]) {
      if (key.charAt(0) !== '_') {
        qResult[key] = formData[step][key].value;
      }
    }
    return qResult;
  }
  componentDidMount() {
    let result = {};
    const formData = this.props.formData;
    for (let step in formData) {
      if (formData.hasOwnProperty(step)) {
        if (formData[step] &&  formData[step].value) {
          result[step] = formData[step].value
        } else {
          result = Object.assign({}, result, ::this.processInner(formData, step));
        }  
      }
    }
    result.accountType = this.props.accountType;
    console.log(JSON.stringify(result));
    api.sendQuestions(result);
  }
  render () {
    return <div>Submit</div>;
  }
}

function mapStateToProps(state) {
  return {
    formData: state.form.dynamic,
    accountType: state.accountType
  };
}

export default connect(mapStateToProps)(Submit);
