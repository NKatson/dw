import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { History } from 'react-router';

import { Footer } from '../components/Footer';
import * as auth from '../redux/actions/auth';

require('./App.css');

class App extends React.Component {
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(auth.logout( () => {
        this.context.history.replaceState(null, '/signin');
    }));
  }
  render() {
    let { userEmail, loggedIn } = this.props;
    loggedIn = localStorage.uid && localStorage.uid !== 'undefined' && localStorage.accessToken ? true : false;
    return (
      <div className="main-wrap">
        <div className="wide-block main-header">
            <div className="container container-1">
              <Link to="/" className="main-logo" />Worth.fm &nbsp;
              {loggedIn ? <Link to="/reset">Reset</Link> : null }
              {loggedIn ? <Link to="/welcome">Welcome</Link> : null }&nbsp;
              {loggedIn ? `Hi, ${localStorage.uid}` : null}
              <div className="cabinet">
                {loggedIn ? <a href="#" onClick={this.handleLogout}>Logout</a> : null }
                {!loggedIn ? <Link to="/signin"><span>Sign In</span></Link> : null }
                {!loggedIn ? <Link to="/signup">Sign Up</Link> : null }
              </div>
            </div>
        </div>
          {this.props.children}
      </div>
    );
  }
};

App.propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.get('loggedIn'),
    userEmail: state.auth.getIn(['user', 'email']),
  }
}

export default connect(mapStateToProps)(App);
