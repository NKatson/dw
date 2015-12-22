import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { validateSurvey as validate } from '../utils/validation';

import { InputText } from '../atoms';
import { InputMultiple } from '../components';

class Accounts extends React.Component {
  renderMultiple() {
    const result = [<div className="input-wrap__text">Which account do you want to fund from?</div>, <br />];
    let sum = 0;

    const inputs = this.props.accounts.map(account => {
      sum += account.balance.available;
      return {
        label: account.meta.name,
        balance: account.balance.available,
        value: account.meta.name,
      }});
    result.push(
      <InputMultiple
        question={{
          name: 'account_choice',
        }}
        inputs={inputs}
        handleClick={(name, value) => {
          console.log('Clicked ' + name + ' ' + value);
        }}
         />
     );
    result.push(<p className="pad-15">Total assets: <b>${sum}</b></p>);
    return result;
  }
  renderOne() {
    return this.props.accounts.map(account => {
      return (
        <div>
          <div className="wfm-from-your-bank__bank-title">{account.meta.name}</div>
          <div className="wfm-from-your-bank__sum">${account.balance.available}</div>
        </div>
      );
    });
  }
  renderAccounts() {
    const { accounts } = this.props;
    if (accounts && accounts.length === 1) {
      return ::this.renderOne();
    }
    return ::this.renderMultiple();
  }
  render() {
    const { fields: { bank_connected_how_much }, accounts } = this.props;
    return (
      <div>
        <h2>3. CONNECT YOUR BANK</h2>
          <p>Your bank account has been successfully linked!</p>
          <form className="common-form anketa-form" onSubmit={this.props.handleSubmit} >
              <div className="anketa-form__fieldset">
                  <InputText
                    inputClass="input-text w-330"
                    label="How much do you want to start your WorthFM account with?"
                    field={bank_connected_how_much}
                    isCurrency={true}
                   />
              </div>
              <div className="anketa-form__fieldset">

                 {accounts.length === 1 ? <p>We will fund your WorthFM account from your bank:</p> : null}

                 <div className="wfm-from-your-bank">
                    {::this.renderAccounts()}
                 </div>
               </div>
             {accounts.length > 1 ?
               <p className="faded-text pad-14">WorthFM uses bank level security and strict 128-encryption.<br />
                Your bank login are never stored.</p>
              : null}

              <div className="text-center">
                <div className="common-form__buttons">
                    {this.props.children}
                </div>
              </div>
          </form>
      </div>
    );
  }
}

Accounts.propTypes = {
    accounts: PropTypes.array.isRequired,
    fields: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    accounts: state.plaid.accounts,
  }
}

export default reduxForm({
  form: 'accounts',
  fields: ['bank_connected_how_much'],
  validate,
  destroyOnUnmount: true
}, mapStateToProps)(Accounts);
