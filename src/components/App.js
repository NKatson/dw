import React, { PropTypes } from 'react';
import {Link} from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>Hello! This is an App.</div>
        <Link to="/">Home</Link>
        <Link to="about">About</Link>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
};

export default App;
