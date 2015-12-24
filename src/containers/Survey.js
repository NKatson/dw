import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { DynamicForm, Category, Header, Footer } from '../components';
import { SurveyFormHeader, PreLoader } from '../atoms';
import * as surveyActions from '../redux/actions/survey';
import * as auth from '../redux/actions/auth';
import * as api from '../utils/apiClient';

class Survey extends React.Component {
  handleParams(params) {
    const { category: nextCategory = null, number: nextNumber = null } = params;
    const { category = 'personal', step = 0 } = this.props;
    if (nextCategory && nextNumber && (category.toLowerCase() != nextCategory || parseInt(nextNumber) != step)) {
      this.props.dispatch(surveyActions.changeQuestion(nextCategory, parseInt(nextNumber)));
    }
  }
  componentWillMount() {
    const { requesting, data } = this.props;
    if (!requesting && !data) {
      this.props.dispatch(surveyActions.getData(() => {
        // redirect if Unauthorized
        this.context.history.push('/signin');
      }));
    }
    ::this.handleParams(this.props.params);
  }
  componentWillReceiveProps(nextProps) {
    ::this.handleParams(nextProps.params);
  }
  handleLogout(e) {
    e.preventDefault();
    const { state } = this.props;
    api.saveState({
      survey: state.survey.toJS(),
      form: state.form,
      auth: state.auth.toJS(),
      bundle: state.bundle,
    }, err => {
      if (err) return console.log(err);
      this.props.dispatch(auth.logout(null, () => {
        this.context.history.push( '/signin');
      }));
    });
  }
  renderCategories(data) {
    let result = [];
    let index = 0;
    const count = Object.keys(data).length;
    const { categoryIndex } = this.props;

    for (let category in data) {
      result.push(<Category
                  isCompleted={index <= categoryIndex ? true : false}
                  index={index + 1}
                  title={category}
                  isLast={index === data.length - 1 ? true : false }
                  key={'category-' + category}
                  />);
      if (index !== count - 1) {
        result.push(
              <div
                key={'dvdr-' + index}
                className={'wfm-steps__dvdr ' + (index < categoryIndex ? 'passed' : '' )}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>);
      }
      index++;
    }

    return result;
  }
  render () {
    const { data, stepType, recommendMessageType, requesting, isDocusign, showCategories } = this.props;
    let categories = [];
    let steps = [];
    if (typeof data !== 'undefined') {
      categories = ::this.renderCategories(data.toJS());
    }
    return (
      <div className="common-page">
          <Header handleLogout={::this.handleLogout} />
          <div className="common-wrap common-wrap_rose">
            <div className={'container container-2 bg-white ' + (isDocusign ? 'docusign' : '')}>
              {
                showCategories ?
                <div className="wfm-steps">
                   {categories}
                </div>
                : null
              }
              {data ? this.props.children : null}
            </div>
          </div>
          <Footer />
      </div>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

Survey.contextTypes = {
  history: RouterPropTypes.history,
};

function mapStateToProps(state) {
  return {
    state: state,
    data: state.survey.get('data'),
    requesting: state.survey.get('requesting'),
    category: state.survey.get('category'),
    categoryIndex: state.survey.get('categoryIndex'),
    accountType: state.survey.get('accountType'),
    recommendMessageType: state.survey.get('recommendMessageType'),
    step: state.survey.get('step'),
    isDocusign: state.docusign.isDocusign,
    showCategories: state.survey.get('showCategories'),
  };
}
export default connect(mapStateToProps)(Survey);
