import React, {PropTypes} from 'react';
import {Link} from 'react-router';

require('./styles');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div>
        <Link to="/reset">Reset</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
          {this.props.children}
      </div>
    );
  }
}

export default App;
