import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { DynamicForm, Category } from '../../components';
import { SurveyFormHeader } from '../../atoms';
import * as surveyActions from '../../redux/actions/survey';

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
                  title={category}
                  isLast={index === data.length - 1 ? true : false }
                  key={'category-' + category}
                  />);
      if (index !== count - 1) {
        result.push(<div key={'dvdr-' + index} className="wfm-steps__dvdr"></div>);
      }
      index++;
    }

    return result;
  }
  render () {
    const { data, stepType, showRecommend } = this.props;
    let categories = [];
    let steps = [];
    if (typeof data !== 'undefined') {
      categories = ::this.renderCategories(data.toJS());
    }
    return (
      <div>
        <div className="wide-block bg-white common-block">
          <div className="container container-1">
            <div className="wfm-steps">
               {categories}
            </div>
          </div>
        </div>
        <div className="wide-block bg-white">
          <div className="container container-1">
              <div className="container-small">
                  {data ? this.props.children : null}
              </div>
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
  };
}
export default connect(mapStateToProps)(Survey);
