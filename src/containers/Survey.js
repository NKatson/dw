import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { PropTypes as RouterPropTypes, Link } from 'react-router';
import { DynamicForm, Category} from '../components';
import { Header, Footer } from '../partials';
import { WelcomeBack, Question } from '../atoms';
import { surveySelector } from '../redux/selectors/surveySelectors';

import * as surveyActions from '../redux/actions/survey';
import * as auth from '../redux/actions/auth';
import * as api from '../utils/apiClient';

class Survey extends React.Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(auth.logout(null, this.props.location.pathname, () => {
        this.context.history.push('/signin');
    }));
  }
  closeWelcome() {
    this.props.dispatch(surveyActions.hideWelcomeBack());
  }
  render () {
    const { showCategories, isDocusign, categories, currentCategoryIndex, showWelcomeBack } = this.props;
    return (
      <div>
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
              {
                showWelcomeBack ?
                  <WelcomeBack
                    firstName={this.props.firstName}
                    handleClose={::this.closeWelcome}
                     />
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

Survey.contextTypes = {
  history: RouterPropTypes.history,
};

Survey.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(surveySelector)(Survey);
