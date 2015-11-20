import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class SurveyFormHeader extends React.Component {
  render() {
    const { text, accountType, handleClick, recommendMessageType } = this.props;
    return (
      <div className="wide-block bg-grey common-block">
        <div className="container container-1">
            <div className="container-small selected-retirement-account">
              {recommendMessageType !== 'selected' ?
                <div>
                  <h2>We recommend...</h2>
                  <p>Since it looks like you'll need access to your money before your retirement,
                    we recommend opening a <span className="color-black">a {accountType ? accountType.toLowerCase() : null}</span>.
                    If you want to explore the other account types, <Link to="/account" onClick={handleClick}>click here</Link>
                    </p>
                </div>
                :
                <div>
                  <h2>You Selected {accountType}</h2>
                  <p>Since it looks like you'll need access to your money before your retirement,
                    a <span className="color-black">{accountType ? accountType.toLowerCase() : null} is a great option</span>.
                    If you want to explore the other account types, <Link to="/account" onClick={handleClick}>click here</Link></p>
                </div>
              }

            </div>
        </div>
      </div>
    );
  }
}

SurveyFormHeader.propTypes = {
  recommendMessageType: PropTypes.string,
  text: PropTypes.string.isRequired,
  accountType: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
}

export default SurveyFormHeader;
