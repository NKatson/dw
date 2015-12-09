import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import $ from 'jquery';

import { logout } from '../redux/actions/auth';
import * as api from '../utils/apiClient';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.needUpdateTimer = true;
  }
  handleLogout() {
    const { state } = this.props;

    api.saveState({
      survey: state.survey.toJS(),
      form: state.form,
      auth: state.auth.toJS()
    }, (err) => {
      if (err) return console.log(err);
      this.props.dispatch(logout(() => {
      //  $("#modalInactivity").modal("hide");
        this.context.history.pushState(null, '/signin');
      }));
    });
  }
  handleClick(e) {
    e.preventDefault();
    if (this.timer) {
      clearTimeout(this.timer);
    }
    console.log(this.timer);
  }
  resetTimer() {
    console.log('reset timer');
    const { sessionTimerId, dispatch } = this.props;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      console.log('Session will end in 2 minutes dYour onlineue to inactivity');
    //  $("#modalInactivity").modal("show");
      this.needUpdateTimer = false;
      let innerId = setTimeout(() => {
          clearTimeout(innerId);
          ::this.handleLogout();
      }, 1000 * 2);
      clearTimeout(this.timer);
    }, 1000 * 3);
  }
  onMouseMove() {
    if (!this.needUpdateTimer) return;
    ::this.resetTimer();
  }
  onKeyDown() {
  if (!this.needUpdateTimer) return;
  //  ::this.resetTimer();
  }
  componentDidMount() {
    require('../../static/scripts/bootstrap.min');
  }
  render() {
    return (
      <div onMouseMove={::this.onMouseMove} onKeyDown={::this.onKeyDown}>
      {this.props.children}
      <div className="modal fade wfm-common-modal" id="modalInactivity" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <div className="modal-body">
                      <h2> session will end in 2 minutes dYour onlineue to inactivity</h2>
                      <p>As a security precaution, if there is no activity, the session will end and you will be brought to the homepage.</p>
                      <p>If you are still working, chose OK to continue.</p>
                      <div className="wfm-common-modal__buttons text-center">
                        <a href="#" handleClick={::this.handleClick} className="btn btn_yellow btn_blue-text">OK <span class="wfm-i wfm-i-arr-right-blue"></span></a></div>
                  </div>
              </div>
          </div>
      </div>
      </div>
    );
  }
}

AppWrapper.contextTypes = {
  history: RouterPropTypes.history,
};

AppWrapper.propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
    sessionTimerId: state.auth.get('sessionTimerId'),
  };
}

export default connect(mapStateToProps)(AppWrapper);
