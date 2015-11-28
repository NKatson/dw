import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { DynamicForm, Category } from '../components';
import { SurveyFormHeader } from '../atoms';
import * as surveyActions from '../redux/actions/survey';

class Survey extends React.Component {
  componentDidMount() {
    if (!this.props.requesting) {
      this.props.dispatch(surveyActions.getData());
    }
  }
  renderCategories(data) {
    let result = [];
    let index = 0;
    const count = Object.keys(data).length;

    for (let category in data) {
      result.push(<Category
                  isCompleted={index <= this.props.categoryIndex ? true : false}
                  index={index + 1}
                  title={category}
                  isLast={index === data.length - 1 ? true : false }
                  key={'category-' + category}
                  />);
      if (index !== count - 1) {
        result.push(
              <div key={'dvdr-' + index} className="wfm-steps__dvdr">
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
    const { data, stepType, showRecommend, recommendMessageType } = this.props;
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
              <div className="wfm-cabinet"><a href="#">Log out</a></div>
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
      </div>
    );
  }
}

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    data: state.survey.get('data'),
    requesting: state.survey.get('requesting'),
    category: state.survey.get('category'),
    categoryIndex: state.survey.get('categoryIndex'),
    showRecommend: state.survey.get('showRecommend'),
    accountType: state.survey.get('accountType'),
    recommendMessageType: state.survey.get('recommendMessageType'),
  };
}
export default connect(mapStateToProps)(Survey);
