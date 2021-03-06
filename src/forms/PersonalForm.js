import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { InputText, Select, SsnInput, Checkbox } from '../atoms';
import { Buttons } from '../components';
import { validateSurvey as validate } from '../utils/validation';
import { personalSelector } from '../redux/selectors/surveySelectors';
import * as surveyActions from '../redux/actions/survey';
import { setForceWelcome } from '../redux/actions/common';

class PersonalForm extends React.Component {
  componentWillMount() {
    this.props.dispatch(surveyActions.setCategoryIndex(0));
  }
  handleShowSsnClick() {
    this.props.dispatch(surveyActions.toggleSsn());
  }
  render () {
    const { questions, fields, title, description, nextLink, prevLink, showSsn } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
          <div className="common-form anketa-form" autoComplete="off">
            {/* first name, last name */}
            <div className="anketa-form__fieldset clearfix">
              <InputText
                additionalClass="disabled pull-left w-230"
                field={fields[questions[0].name]}
                placeholder="First name"
              />
              <InputText
                additionalClass="pull-right w-230"
                field={fields[questions[1].name]}
                placeholder="Last name"
              />
            </div>
            {/* address, city, state, zip code */}
            <div className="anketa-form__fieldset">
                <InputText
                  field={fields[questions[2].name]}
                  placeholder="Address"
                />
                <InputText
                  additionalClass="w-160 pad-03"
                  field={fields[questions[3].name]}
                  placeholder="City"
                />
                <div className="input-wrap w-160 pad-03">
                  <Select
                      additionalClass="w-160 pad-03"
                      field={fields[questions[4].name]}
                      key={questions[4].name}
                      options={questions[4].answers}
                      placeholder="State"
                      />
                </div>
                <InputText
                  additionalClass="w-160 inline-block"
                  field={fields[questions[5].name]}
                  placeholder="Zip Code"
                />
              </div>
              <div className="anketa-form__fieldset">
                {/* marital status */}
                <div>
                  <Select
                      additionalClass="w-230 pad-03"
                      field={fields[questions[9].name]}
                      key={questions[9].name}
                      options={questions[9].answers}
                      />
                    <div className="input-descr"> What is your marital status?</div>
                </div>
                {/* phone */}
                <div>
                  <InputText
                    additionalClass="w-230 pad-03"
                    maskPattern="111-111-1111"
                    field={fields[questions[6].name]}
                    isNormalized={true}
                    placeholder="Phone number"
                  />
                  <div className="input-descr"> We will send your phone a text confirmation.</div>
                </div>
                {/* ssn */}
                <div>
                  <SsnInput
                      key="ssn"
                      field={fields['ssn']}
                      showSsn={showSsn}
                      handleShowSsnClick={::this.handleShowSsnClick}
                      />
                      <div className="input-descr">
                        <Checkbox
                          id="showSecurityNumber"
                          handleClick={::this.handleShowSsnClick}
                          label="Show"
                          />
                      </div>
                </div>
                {/* date of birth */}
                <div>
                  <InputText
                    maskPattern="11/11/1111"
                    additionalClass="w-230 pad-03"
                    field={fields[questions[8].name]}
                    isNormalized={true}
                    placeholder="Date of birth"
                  />
                  <div className="input-descr">MM/DD/YYYY</div>
                </div>
              </div>
              <Buttons
                fields={fields}
                onPrevClick={(e) => {
                  this.props.dispatch(setForceWelcome())
                }}
                nextLink={nextLink}
                prevLink={prevLink}
              />
          </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'basicinfo',
  fields: [
    'first_name',
    'last_name',
    'address',
    'city',
    'state',
    'address',
    'zip_code',
    'phone',
    'ssn',
    'marital_status',
    'date_of_birth',
  ],
  validate,
  destroyOnUnmount: false,
}, personalSelector)(PersonalForm);
