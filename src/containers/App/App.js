import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Footer } from '../../components';
require('./App.css');

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  };
  render() {
    const { loggedIn, userEmail } = this.props;
    return (
      <div className="main-wrap">
        <div className="wide-block main-header">
            <div className="container container-1">
                <Link to="/" className="main-logo" />Worth.fm &nbsp;
                {loggedIn ? <Link to="/reset">Reset</Link> : null }
                {loggedIn ? <Link to="/welcome">Welcome</Link> : null }
                {!loggedIn ? <Link to="/signin">Sign In</Link> : null }
                {!loggedIn ? <Link to="/signup">Sign Up</Link> : null }&nbsp;
                {loggedIn ? `Hi, ${userEmail}` : null}
                <div className="cabinet">
                    <span></span>
                </div>
            </div>
        </div>
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.get('loggedIn'),
    userEmail: state.auth.getIn(['user', 'email']),
  }
}

export default connect(mapStateToProps)(App);
