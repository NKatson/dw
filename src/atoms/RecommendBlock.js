import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class RecommendBlock extends React.Component {
  render () {
    const { accountType, isSelected } = this.props;
    const title = isSelected  ? 'You selected ' + accountType : 'We recommend...';

    return (
      <div className="blue-block">
        <h3>{title}</h3>
        <p className="text-center">Since it looks like you won’t need access to your money before your retirement
          {isSelected ? '' : ' we recommend opening a'} <strong>{accountType}</strong>
          {isSelected ? ' is a great option' : ''}. If you want to explore the other account types
            ,<Link to="/account">click here</Link>.</p>
    </div>
    );
  }
}

RecommendBlock.propTypes = {
  isSelected: PropTypes.bool,
  accountType: PropTypes.string,
}


export default RecommendBlock;
