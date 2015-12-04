import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <div className="container container-2">
            <Link to="/" ><img src={require('../../static/images/logo-140.png')} /></Link>
            <div className="wfm-cabinet"><a href="#" onClick={this.props.handleLogout}>Logout</a></div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
}

export default Header;
