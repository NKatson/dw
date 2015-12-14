import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { plaidAuth } from '../utils/apiClient';
import { auth } from '../redux/actions/plaid';

class ConnectBank extends React.Component {
  componentDidMount() {
    this.linkHandler = Plaid.create({
        clientName: 'demo',
        env: 'tartan',
        product: 'auth',
        key: 'test_key',
        onSuccess: (publicToken) => {
            this.props.dispatch(auth(publicToken, (err, data) => {
              if (err) return console.log(err);
              window.location = '/survey/fund/q/1';
            }));
        },
      });
  }
  handleBankClick(e) {
    e.preventDefault();
    let id = e.target.id;
    if (id) {
      id = id.slice(0, -2);
      this.linkHandler.open(id);
    }
  }
  renderBanks() {
    const { banks, bankTypes } = this.props;
    if (!banks) return;

    return banks.filter(bank => {
      return bankTypes.indexOf(bank.type) !== -1;
    })
    .map(bank => {
      const src = '../../static/images/banks/' + bank.type + '.png';
      return  (
        <a href="#"
          id={bank.type + '-a'}
          onClick={::this.handleBankClick}
          className="wfm-bank-item">
          <img id={bank.type + '-i'} src={'/dist/banks/' + bank.type + '.png'} alt=""/>
        </a>
      );
    });
  }
  render() {
    return (
      <div>
        <h2>3. CONNECT YOUR BANK</h2>
        <p>Securely connect your bank account to your WorthFM account. When you fund your WorthFM account, your personalized plan automagically creates balance between your savings, investments, and retirement.</p>
        <form className="common-form anketa-form">
          <div className="wfm-banks-list">
            {::this.renderBanks()}
          </div>
          <div className="input-wrap">
              <div className="input-wrap__text">Search all banks:</div>
              <input onKeyUp={::this.props.handleBanksSearch} type="text" className="input-text" placeholder="Enter Your Bank Name" />
              {this.props.searchBanks.map((bank, index) => {
                return <p key={bank + index}>{bank.name}</p>
              })}
          </div>
          <p className="faded-text pad-14">WorthFM uses bank level security and strict 128-encryption.<br />
              Your bank login are never stored.</p>
            <div className="text-center">
              {this.props.children}
          </div>
        </form>
      </div>
    );
  }
}

ConnectBank.propTypes = {
  handleBanksSearch: PropTypes.func.isRequired,
  banks: PropTypes.array.isRequired,
  searchBanks: PropTypes.array.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}

export default connect(null, mapDispatchToProps)(ConnectBank);
