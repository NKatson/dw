import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { DynamicForm, Category} from '../components';
import { Header, Footer } from '../partials';
import { SurveyFormHeader, Question } from '../atoms';
import { categoriesSelector } from '../redux/selectors/surveySelectors';

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
    ::this.handleParams(this.props.params);
  }
  componentWillReceiveProps(nextProps) {
    ::this.handleParams(nextProps.params);
  }
  handleLogout(e) {
    // e.preventDefault();
    // const { state } = this.props;
    // api.saveState({
    //   survey: state.survey.toJS(),
    //   form: state.form,
    //   auth: state.auth.toJS(),
    //   bundle: state.bundle,
    // }, err => {
    //   if (err) return console.log(err);
    //   this.props.dispatch(auth.logout(null, () => {
    //     this.context.history.push( '/signin');
    //   }));
    // });
  }
  render () {
    const { showCategories, isDocusign, categories, currentCategoryIndex } = this.props;
    return (
      <div className="common-page">
          <Header handleLogout={::this.handleLogout} />
          <div className="common-wrap common-wrap_rose">
            <div className={'container container-2 bg-white ' + (isDocusign ? 'docusign' : '')}>
              {
                showCategories ?
                <div className="wfm-steps">
                  {categories.map(category => {
                    return <Category
                      category={category}
                      key={'category-' + category.name}
                      currentCategoryIndex={currentCategoryIndex}
                      />
                  })}
                </div>
                : null
              }
              {this.props.children}
              <Question />
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

export default connect(categoriesSelector)(Survey);
