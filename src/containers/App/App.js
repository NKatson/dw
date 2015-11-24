import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { History } from 'react-router';

import { Footer } from '../../components';
import * as auth from '../../redux/actions/auth';

require('./App.css');

let App = React.createClass({
  propTypes : {
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  },
  mixins: [ History ],
  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(auth.logout( () => {
        this.history.replaceState(null, '/signin');
    }));
  },
  render() {
    const { userEmail, loggedIn } = this.props;
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
        <Footer />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    loggedIn: state.auth.get('loggedIn'),
    userEmail: state.auth.getIn(['user', 'email']),
  }
}

export default connect(mapStateToProps)(App);
