import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, History, PropTypes as RouterPropTypes } from 'react-router';
import ConnectBankError from './ConnectBankError';
import * as api from '../utils/apiClient';
import { auth, exit, reset } from '../redux/actions/plaid';
import { Question } from '../atoms';

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

              const { state } = this.props;
              api.saveState({
                survey: state.survey.toJS(),
                form: state.form,
                plaid: state.plaid,
              }, (err) => {
                if (err) return console.log(err);
                this.context.history.replaceState(null, '/survey/fund/q/1');
              });
            }));
        },
        onExit: () => {
          this.props.dispatch(exit());
        }
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
  reconnect() {
      this.props.dispatch(reset());
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
                  <input onKeyUp={::this.props.handleBanksSearch} type="text" className="input-text" placeholder="Enter Your Bank Name" />
                  {this.props.searchBanks.map((bank, index) => {
                    return <p key={bank + index}>{bank.name}</p>
                  })}
              </div>
              <p className="faded-text pad-14">WorthFM uses bank level security and strict 128-encryption.<br />
                  Your bank login are never stored.</p>
                <p>You can also fund your account by sending a <Link to='/survey/fund/q/3'>wire transfer</Link> or <Link to='/survey/fund/q/4'>check</Link>. You can also enter your
                  <Link to='/survey/fund/q/2'> banking information</Link>.</p>
                <div className="text-center">
                  {this.props.children}
                </div>
            </form>
          </div>
      }
      <Question />
      </div>
    );
  }
}

ConnectBank.contextTypes = {
    history: RouterPropTypes.history,
};

ConnectBank.propTypes = {
  handleBanksSearch: PropTypes.func.isRequired,
  banks: PropTypes.array.isRequired,
  searchBanks: PropTypes.array.isRequired,
  exit: PropTypes.bool.isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}

export default connect(null, mapDispatchToProps)(ConnectBank);