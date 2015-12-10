import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setBanks, searchBanks } from '../redux/actions/plaid';

class ConnectBank extends React.Component {
  componentDidMount() {
    this.linkHandler = Plaid.create({
        clientName: 'demo',
        env: 'tartan',
        product: 'auth',
        key: 'test_key',
        onSuccess: function(token) {
          console.log('GOT TOKEN --> ' + token);
          //window.location = '/accounts.html?public_token=' + token;
        },
      });
  }
  handleSearch(e) {
    this.props.dispatch(searchBanks(e.target.value));
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
    if (!this.props.banks) return;
    const bankTypes = ['amex', 'bofa', 'chase', 'citi', 'suntrust', 'td', 'us', 'wells'];

    return this.props.banks.filter(bank => {
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
        <form id="connect-banks-form" className="common-form anketa-form">
          <div className="wfm-banks-list">
            {::this.renderBanks()}
          </div>
          <div className="input-wrap">
              <div className="input-wrap__text">Search all banks:</div>
              <input onKeyUp={::this.handleSearch} type="text" className="input-text" placeholder="Enter Your Bank Name" />
              {this.props.searchBanks.map((bank, index) => {
                return <p key={bank + index}>{bank.name}</p>
              })}
          </div>
          <p className="faded-text pad-14">WorthFM uses bank level security and strict 128-encryption.<br />
              Your bank login are never stored.</p>
            <div className="text-center">
              <div className="common-form__buttons">
                  <a href="#" className="common-form__back-link"><span className="wfm-i wfm-i-arr-left-grey"></span>Go Back</a>
                  <button className="btn btn_yellow" disabled>Next <span className="wfm-i wfm-i-arr-right-grey"></span></button>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    banks: state.plaid.banks,
    searchBanks: state.plaid.searchBanks,
  }
}

export default connect(mapStateToProps)(ConnectBank);
