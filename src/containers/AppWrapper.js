import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes } from 'react-router';
import $ from 'jquery';

import { logout, setError } from '../redux/actions/auth';
import * as api from '../utils/apiClient';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.needUpdateTimer = true;
    this.needLogout = true;
  }
  onMouseMove() {
    if (!this.needUpdateTimer) return;
    ::this.resetTimer();
  }
  onKeyDown() {
  if (!this.needUpdateTimer) return;
    ::this.resetTimer();
  }
  handleLogout() {
    $('#modalInactivity').on('hidden.bs.modal', () => {
      if (this.needLogout) {
        this.context.history.push('/signin');
      }
    });
    const { state } = this.props;
    api.saveState({
      survey: state.survey.toJS(),
      form: state.form,
      auth: state.auth.toJS()
    }, (err) => {
      if (err) return console.log(err);
      const errorMessage = 'You have been logged out due to inactivity.';
      this.props.dispatch(logout(errorMessage, () => {
        $('#modalInactivity').modal('hide');
        this.needLogout = true;
      }));
    });
  }
  handleModalButtonClick(e) {
    e.preventDefault();
    if (this.innerTimer) {
      clearTimeout(this.innerTimer);
    }
    this.needUpdateTimer = true;
    $("#modalInactivity").modal("hide");
  }
  resetTimer() {
    const { sessionTimerId, dispatch } = this.props;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      $("#modalInactivity").modal("show");
      this.needUpdateTimer = false;
      this.innerTimer = setTimeout(() => {
          clearTimeout(this.innerTimer);
          ::this.handleLogout();
      }, 1000 * 60 * 2);
      clearTimeout(this.timer);
    }, 1000 * 60 * 13);
  }
  render() {
    let sessionProps = {};
  //  if (this.props.loggedIn) {
      sessionProps = {
        onMouseMove: ::this.onMouseMove,
        onKeyDown: ::this.onKeyDown,
      }
    //}
    return (
      <div {...sessionProps} >
        {this.props.children}
        <div className="modal fade wfm-common-modal" id="modalInactivity" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
              <div className="modal-content">
                  <button onClick={::this.handleModalButtonClick} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <div className="modal-body">
                      <h2>Your online session will end in 2 minutes due to inactivity</h2>
                      <p>As a security precaution, if there is no activity, the session will end and you will be brought to the homepage.</p>
                      <p>If you are still working, chose OK to continue.</p>
                      <div className="wfm-common-modal__buttons text-center">
                        <a href="#" onClick={::this.handleModalButtonClick}
                          className="btn btn_yellow btn_blue-text">OK <span className="wfm-i wfm-i-arr-right-blue"></span></a></div>
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
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
    loggedIn: state.auth.get('loggedIn'),
  }
}

export default connect(mapStateToProps)(AppWrapper);
