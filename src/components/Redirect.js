import React, { PropTypes } from 'react'

class Redirect extends React.Component {
  componentDidMount() {
    let port = window.location.port.length > 0 ? ':' + window.location.port : '';
    window.top.location.href = `http://${window.location.hostname}${port}/dashboard`;
  }
  render() {
    return <p>Loading...</p>;
  }
}

export default Redirect;
