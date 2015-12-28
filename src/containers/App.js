import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { History } from 'react-router';
import { Footer } from '../partials';

require('./App.css');

class App extends React.Component {
  render() {
    const { userEmail, loggedIn } = this.props;
      return (
        <div className="wfm-main-wrap">
          <div className="common-wrap common-wrap_white-shadowed">
            <div className="container container-2">
              {this.props.children}
            </div>
          </div>
          <Footer />
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
