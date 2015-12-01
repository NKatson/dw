import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Footer } from '../components';

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <header className="main-header">
          <div className="container container-2">
              <Link to="/" ><img src={require('../../static/images/logo-140.png')} /></Link>
          </div>
        </header>
        <div className="common-wrap common-wrap_rose">
          <div className="container container-2 bg-white">
            <div className="wfm-slogan">A balanced you.</div>
            <p className="text-center pad-09">Your WorthFM personalized plan will create a balanced financial picture for your now, your future,
                and all your dreams in between.
            </p>
            <p className="text-center"><b>You’ll be on your way in four simple steps:</b></p>
            <div className="wfm-steps wfm-steps_no-border">
                <div className="wfm-step">
                    <div className="wfm-step__num">1</div>
                    <div className="wfm-step__text">Tell us<br /> about you</div>
                </div>
                <div className="wfm-steps__dvdr passed"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="wfm-step">
                    <div className="wfm-step__num">2</div>
                    <div className="wfm-step__text">Set up<br /> your account</div>
                </div>
                <div className="wfm-steps__dvdr"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="wfm-step">
                    <div className="wfm-step__num">3</div>
                    <div className="wfm-step__text">Fund<br /> your account</div>
                </div>
                <div className="wfm-steps__dvdr"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
                <div className="wfm-step">
                    <div className="wfm-step__num">4</div>
                    <div className="wfm-step__text">Confirm<br /> and go!</div>
                </div>
            </div>

            <div className="text-center pad-10">
                <Link to="/survey" className="btn btn_yellow">Get started <span className="wfm-i wfm-i-arr-right-grey"></span></Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Welcome;
