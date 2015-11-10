import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

require('./App.css');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };
  render() {
    return (
      <div className="main-wrap">
        <div className="wide-block main-header">
            <div className="container container-1">
                <Link to="/" className="main-logo" />Text
                <Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
                <Link to="/reset">Reset</Link>
                <div className="cabinet">
                    <span></span>
                </div>
            </div>
        </div>
        <div className="wide-block">
          {this.props.children}
        </div>
        <div className="wide-block main-footer">
            <div className="container container-1">
                <div className="main-footer__copy"><span></span></div>
                Disclaimer
            </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
