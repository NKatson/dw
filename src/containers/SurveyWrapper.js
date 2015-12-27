import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes } from 'react-router';
import $ from 'jquery';

import { logout, setError } from '../redux/actions/auth';
import * as api from '../utils/apiClient';

class SurveyWrapper extends React.Component {
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
      auth: state.auth.toJS(),
      bundle: state.bundle,
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
      <div className="wfm-main-wrap common-page">
        {this.props.children}
      </div>
    );
  }
}

SurveyWrapper.contextTypes = {
  history: RouterPropTypes.history,
};


SurveyWrapper.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    state,
    loggedIn: state.auth.get('loggedIn'),
  }
}

export default connect(mapStateToProps)(SurveyWrapper);
