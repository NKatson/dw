import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  const imagesPath = '../../static/images';
  return (
    <footer className="main-footer">
      <div className="container container-1">
          <div className="main-footer__logos clearfix">
              <div className="pull-left"><img src={require('../../static/images/logo-white-125.png')} alt=""/></div>
              <div className="pull-right main-footer__logo-block">
                  <div className="main-footer__logo-block-inner"><a href="#"><img src={require('../../static/images/security-logo.png')} alt=""/></a></div>
              </div>
              <div className="pull-right main-footer__logo-block">
                  <div className="main-footer__logo-block-inner">
                      <a href="#"><img src={require('../../static/images/td-bank-logo.png')} alt=""/></a>
                      <a href="#"><img src={require('../../static/images/ameritrade-logo.png')} alt=""/></a>
                  </div>
              </div>
          </div>
          <div>This website is operated and maintained by Balance Worldwide Financial LLC, an SEC Registered Investment Advisor. By using this website, you accpet our
              <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>. Past performance is no guarantee of future results. Any historical returns, expected returns, or probability projections may not reflect actual future performance. All securities involve risk and may result in loss. We do not provide financial planning services to individual investors.</div>
      </div>
  </footer>
  );
};

export default Footer;
