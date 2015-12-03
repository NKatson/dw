import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { DynamicForm, Category, Footer } from '../components';
import { SurveyFormHeader } from '../atoms';
import * as surveyActions from '../redux/actions/survey';
import * as auth from '../redux/actions/auth';

class Survey extends React.Component {
  componentDidMount() {
    const { requesting, data } = this.props;
    if (!requesting && !data) {
      this.props.dispatch(surveyActions.getData(() => {
        // redirect if Unauthorized
        this.context.history.pushState(null, '/signin');
      }));
    }
  }
  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(auth.logout( () => {
        this.context.history.pushState(null, '/signin');
    }));
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
                className={'wfm-steps__dvdr ' + (index === categoryIndex - 1 ? 'passed' : null )}>
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
    const { data, stepType, recommendMessageType } = this.props;
    let categories = [];
    let steps = [];
    if (typeof data !== 'undefined') {
      categories = ::this.renderCategories(data.toJS());
    }
    return (
      <div>
        <header className="main-header">
          <div className="container container-2">
              <Link to="/" ><img src={require('../../static/images/logo-140.png')} /></Link>
              <div className="wfm-cabinet"><a href="#" onClick={::this.handleLogout}>Logout</a></div>
          </div>
        </header>
        <div className="common-wrap common-wrap_rose">
          <div className="container container-2 bg-white">
            <div className="wfm-steps">
               {categories}
            </div>
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
    data: state.survey.get('data'),
    requesting: state.survey.get('requesting'),
    category: state.survey.get('category'),
    categoryIndex: state.survey.get('categoryIndex'),
    accountType: state.survey.get('accountType'),
    recommendMessageType: state.survey.get('recommendMessageType'),
  };
}
export default connect(mapStateToProps)(Survey);
