import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { setCategoryIndex, setCurrentLink } from '../redux/actions/survey';
import { accountsSelector } from '../redux/selectors/surveySelectors';
import { validateSurvey as validate } from '../utils/validation';
import { InputText } from '../atoms';
import { InputMultiple, Buttons } from '../components';
import { savePlaidData } from '../redux/actions/saveActions';

class Accounts extends React.Component {
  componentWillMount() {
    this.props.dispatch(setCategoryIndex(2));
  }
  renderMultiple() {
    const result = [<div className="input-wrap__text">Which account do you want to fund from?</div>, <br />];
    let sum = 0;
    
    if (!this.props.accounts) return;
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
          name: 'plaid_account_id',
        }}
        inputs={inputs}
        value={this.props.value}
        field={this.props.fields.plaid_account_id}
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
  onNextClick() {
    savePlaidData(this.props.plaidForm)
  }
  render() {
    const { fields: { plaid_amount, plaid_account_id  }, accounts, value } = this.props;
    return (
      <div>
        <h2>3. CONNECT YOUR BANK</h2>
          <p>Your bank account has been successfully linked!</p>
          <form className="common-form anketa-form" onSubmit={this.props.handleSubmit} >
              <div className="anketa-form__fieldset">
                  <InputText
                    inputClass="input-text w-330"
                    label="How much do you want to start your WorthFM account with?"
                    field={plaid_amount}
                    isCurrency={true}
                   />
              </div>
              <div className="anketa-form__fieldset">
                 {accounts && accounts.length === 1 ? <p>We will fund your WorthFM account from your bank:</p> : null}
                 <div className="wfm-from-your-bank">
                    {::this.renderAccounts()}
                 </div>
               </div>
             {accounts && accounts.length > 1 ?
               <p className="faded-text pad-14">WorthFM uses bank level security and strict 128-encryption.<br />
                Your bank login are never stored.</p>
              : null}
              <Buttons
                fields={this.props.fields}
                onNextClick={::this.onNextClick}
                nextLink='/survey/docusign'
                prevLink='/survey/banks' />
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

export default reduxForm({
  form: 'plaid',
  fields: ['plaid_account_id', 'plaid_amount'],
  validate,
  destroyOnUnmount: false,
}, accountsSelector)(Accounts);
