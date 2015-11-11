import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div className="wide-block main-footer">
      <div className="container container-1">
          <div className="clearfix">
              <div className="pull-left">
                  <div className="main-footer__copy"><span>Worth FM</span></div>
                  <div className="main-footer__text">
                      This website id operated and maintained by Balance Worldwide Finantial LLC, and SEC Registered investment Advisor. By using the website, you accept the Terms of Use Privacy Policy. Past performance is no quarantee of future results. Any historical returns, expected returns, or probability projections may not reflect actual future performance. All securities involve risk and may result in loss. We do not provide financial planning services to individual investors.
                  </div>
              </div>
              <div className="pull-right">
                  <ul className="main-footer__menu">
                      <li><Link to="/">WorthFm.com</Link></li>
                      <li>|</li>
                      <li><a href="#">Privacy</a></li>
                      <li>|</li>
                      <li><a href="#">Security</a></li>
                  </ul>
              </div>
          </div>
          <div className="main-footer__logos">
              <div className="main-footer__logo">TDA</div>
              <div className="main-footer__logo">Secure Lock</div>
          </div>
      </div>
  </div>
  );
};

export default Footer;
