import React from 'react';

class Registration extends React.Component {
  render() {
    return (
      <div className="container container-1">
          <div className="login-block">
              <img src={require('../../public/images/logo-big.png')} alt=""/>
              <div className="login-block__site-title">Worth.fm</div>
              <div className="login-block__site-descr">Invest in possibility.</div>
              <form action="" className="common-form login-form">
                  <div className="input-wrap input-wrap_with-icon">
                      <div className="input-wrap__icon"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></div>
                      <input type="text" className="text full-width" placeholder="example@website.com" />
                  </div>
                  <div className="input-wrap input-wrap_with-icon">
                      <div className="input-wrap__icon"><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></div>
                      <input type="pasword" className="text full-width" placeholder="Password" />
                  </div>
                  <div className="input-wrap input-wrap_with-icon">
                      <div className="input-wrap__icon"><span className="glyphicon glyphicon-lock" aria-hidden="true"></span></div>
                      <input type="pasword" className="text full-width" placeholder="Confirm Password" />
                  </div>
                  <div className="input-wrap">
                      <button className="btn btn_blue w-308">Sign Up</button>
                  </div>
                  <div>Already have an account? <a href="#">Sign In.</a></div>
              </form>
          </div>
      </div>
    );
  }
}

export default Registration;
