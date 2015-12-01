import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class RecommendBlock extends React.Component {
  render () {
    const { selectedAccountType, defaultAccountType } = this.props;
    const title = selectedAccountType  ? 'You selected ' + selectedAccountType : 'We recommend...';

    return (
      <div className="blue-block">
        <h3>{title}</h3>
        <p className="text-center">Since it looks like you won’t need access to your money before your retirement
          {selectedAccountType ? '' : ' we recommend opening a'} <strong>{defaultAccountType}</strong>
        {selectedAccountType ? ' is a great option' : ''}. If you want to explore the other account types
            ,<Link to="/account">click here</Link>.</p>
    </div>
    );
  }
}

RecommendBlock.propTypes = {
  selectedAccountType: PropTypes.string,
  defaultAccountType: PropTypes.string,
}


export default RecommendBlock;
