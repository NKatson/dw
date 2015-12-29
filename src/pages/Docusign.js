import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { docusignPageSelector } from '../redux/selectors/surveySelectors';
import { setCategoryIndex } from '../redux/actions/survey';
import * as actions from '../redux/actions/docusign';
import * as api from '../utils/apiClient';

class Docusign extends React.Component {
  componentWillMount() {
    this.props.dispatch(setCategoryIndex(3));
  }
  componentDidMount() {
    const { isDocusign, dispatch } = this.props;

    if (!isDocusign) {
      dispatch(actions.setIsDocusign(true));
      api.validateDocusign((err, data) => {
        if (err) return console.log(err);

        let isValid = true;

        // check validation
        data.steps.map(step => {
          if (!isValid) return;
          for (let key in step) {
            if (step[key].errors && step[key].errors) {
              isValid = false;
              dispatch(actions.setError('Sorry, your personal data is invalid.'));
            }
          }
        });

        // if valid, get docusign_url
        if (isValid) {
          api.getDocusignLink((err, data) => {
            if (err) {
              dispatch(actions.setError(err.error));
              return;
            }
            dispatch(actions.setLink(data.docusign_url))
          });
        }
      });
    }
  }
  componentWillUnmount() {
    if (this.props.isDocusign) {
      this.props.dispatch(actions.setIsDocusign(false));
    }
  }
  render() {
    const { link, error } = this.props;
    return (
      <div>
        <h2>4. ONLY THINGS YOU KNOW</h2>
        <p>We already love you, and we want to make sure you’re really you to keep you safe. Confirm your identity by answering these three questions.</p>
        <div className="wfm-docusign">
            {error && !link ? <p>{error}</p> : null}
            {link ? <iframe style={{width: '1050px', height: '1000px'}} src={link}></iframe> : null }
            <div className="text-center">
              <div className="common-form__buttons">
                  {this.props.children}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default connect(docusignPageSelector)(Docusign);
