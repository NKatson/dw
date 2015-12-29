import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, History, PropTypes as RouterPropTypes } from 'react-router';

import { Buttons } from '../components';
import { ConnectBankError } from '../partials';
import * as api from '../utils/apiClient';
import { setCategoryIndex } from '../redux/actions/survey';
import { auth, exit, reset, setBanks } from '../redux/actions/plaid';
import { Question } from '../atoms';

class ConnectBank extends React.Component {
  componentWillMount() {
    this.props.dispatch(setCategoryIndex(2));
  }
  componentDidMount() {
    if (this.props.banks.length === 0) {
      console.log('yep');
      api.plaidGetBanks((err, data) => {
        if (err) return console.log(err);
        this.props.dispatch(setBanks(data));
      });
    }
    this.linkHandler = Plaid.create({
        clientName: 'demo',
        env: 'tartan',
        product: 'auth',
        key: 'test_key',
        onSuccess: (publicToken) => {
            this.props.dispatch(auth(publicToken, (err, data) => {
              if (err) return console.log(err);

              const { state } = this.props;
              api.saveState({
                survey: state.survey.toJS(),
                form: state.form,
                plaid: state.plaid,
              }, (err) => {
                if (err) return console.log(err);
                this.context.history.replaceState(null, '/survey/accounts');
              });
            }));
        },
        onExit: () => {
          this.props.dispatch(exit());
        }
      });
  }
  handleBanksSearch() {

  }
  handleBankClick(e) {
    e.preventDefault();
    let id = e.target.id;
    if (id) {
      id = id.slice(0, -2);
      this.linkHandler.open(id);
    }
  }
  reconnect() {
      this.props.dispatch(reset());
  }
  renderBanks() {
    const { banks, bankTypes } = this.props;
    if (!banks || !bankTypes) return;

    return banks.filter(bank => {
      return bankTypes.indexOf(bank.type) !== -1;
    })
    .map(bank => {
      const src = '../../static/images/banks/' + bank.type + '.png';
      return  (
        <a href="#"
          key={bank.type}
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
        {
          this.props.exit ? <ConnectBankError reconnect={::this.reconnect} /> :
          <div>
            <h2>3. CONNECT YOUR BANK</h2>
            <p>Securely connect your bank account to your WorthFM account. When you fund your WorthFM account, your personalized plan automagically creates balance between your savings, investments, and retirement.</p>
            <form className="common-form anketa-form">
              <div className="wfm-banks-list">
                {::this.renderBanks()}
              </div>
              <div className="input-wrap">
                  <div className="input-wrap__text">Search all banks:</div>
                  <input onKeyUp={::this.handleBanksSearch} type="text" className="input-text" placeholder="Enter Your Bank Name" />
                  {this.props.searchBanks.map((bank, index) => {
                    return <p key={bank + index}>{bank.name}</p>
                  })}
              </div>
              <p className="faded-text pad-14">WorthFM uses bank level security and strict 128-encryption.<br />
                  Your bank login are never stored.</p>
                <p>You can also fund your account by sending a <Link to='/survey/transfer'>wire transfer</Link> or <Link to='/survey/mail'>check</Link>. You can also enter your
                  <Link to='/survey/check'> banking information</Link>.</p>
                    <Buttons
                      prevLink='/survey/bundle'
                    />
            </form>
          </div>
      }
      </div>
    );
  }
}

ConnectBank.contextTypes = {
    history: RouterPropTypes.history,
};

ConnectBank.propTypes = {
  banks: PropTypes.array.isRequired,
  searchBanks: PropTypes.array.isRequired,
  exit: PropTypes.bool.isRequired,
}

export default connect(state => {
  return {
    state: state,
    ...state.plaid
  };
})(ConnectBank);
