import React, { PropTypes } from 'react';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { connect } from 'react-redux';
import { Header, Footer } from '../components';
import { logout } from '../redux/actions/auth';
import * as api from '../utils/apiClient';
import { getData, showWelcomeBack } from '../redux/actions/survey';

class Welcome extends React.Component {
  redirect() {
    const { currentLink, dispatch } = this.props;
    if (currentLink && currentLink !== '/welcome') {
      dispatch(showWelcomeBack());
      return this.context.history.push(currentLink);
    }
  }
  componentDidUpdate() {
    const { data, state, forceWelcome } = this.props;
    if (forceWelcome) return;

    if (!forceWelcome && this.props.data) {
      api.saveState({
        survey: state.survey.toJS(),
        form: state.form,
        auth: state.auth.toJS(),
        bundle: state.bundle,
      }, (err) => {
        if (err) {
          return this.context.history.push( '/signin');
        }
        ::this.redirect();
    });
    }
  }
  componentDidMount() {
    const { requesting, data, dispatch, state, forceWelcome } = this.props;
    if (forceWelcome) return;
    ::this.redirect();

    if (!requesting && !data) {
      this.props.dispatch(getData((err) => {
      }));
    }
  }
  saveState() {
    api.saveState({
      survey: state.survey.toJS(),
      form: state.form,
      auth: state.auth.toJS(),
      bundle: state.bundle,
    }, (err) => {
      if (err) return console.log(err);
      ::this.redirect();
    });
  }
  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(logout(null, () => {
        this.context.history.push( '/signin');
    }));
  }
  render() {
    return (
      <div className="common-wrap">
        <Header handleLogout={::this.handleLogout} />
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
                <div className="wfm-steps__dvdr"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
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

Welcome.contextTypes = {
  history: RouterPropTypes.history,
};

Welcome.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
    data: state.survey.get('data'),
    forceWelcome: state.common.forceWelcome,
    requesting: state.survey.get('requesting'),
    currentLink: state.survey.get('currentLink'),
  }
}

export default connect(mapStateToProps)(Welcome);
