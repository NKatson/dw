import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class SurveyFormHeader extends React.Component {
  render() {
    const { title, text } = this.props
    return (
      <div className="wide-block bg-grey common-block">
        <div className="container container-1">
            <div className="container-small selected-retirement-account">
                <h2>We Recommend...</h2>
               <p>Since it looks like you'll need access to your money before your retirement,
                  we recommend opening a <span className="color-black">a retirement account</span>.
                  If you want to explore the other account types, <a href="#">click here</a></p>
            </div>
        </div>
      </div>
    );
  }
}

SurveyFormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default SurveyFormHeader;
