import React, { PropTypes } from 'react'
import {Authorization} from '../../components';
import {connect} from 'react-redux';

class Login extends React.Component {
  handleSubmit(data) {
    console.log('Submit! ' + JSON.stringify(data));
  }
  render() {
    <div>
      <Authorization
          handleSubmit={::this.handleSubmit}
      />
    </div>
  }
}

export default Login;
