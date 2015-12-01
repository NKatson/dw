import React, { PropTypes } from 'react';
import { InputText, Select, SsnInput } from '../atoms';

class PersonalForm extends React.Component {
  render () {
    const { questions, fields, handleStateChange, showSsn, onSsnChange, storedSsn,
       ssnError, handleShowSsnClick } = this.props;
       console.log(fields['ssn']);
    return (
      <div>
        {/* first name, last name */}
        <div className="anketa-form__fieldset clearfix">
          <InputText
            additionalClass="pull-left w-230"
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
                  onSsnChange={onSsnChange}
                  storedSsn={storedSsn}
                  ssnError={ssnError}
                  />
                  <p className="input-descr">
                    <input type="checkbox" className="chbx-styled" onClick={handleShowSsnClick} /> <label>Show</label>
                  </p>
            </div>
            {/* date of birth */}
            <div>
              <InputText
                maskPattern="11/11/1111"
                additionalClass="w-230 pad-03"
                field={fields[questions[8].name]}
                isNormalized={true}
                placeholder="Date of birth  MM/DD/YYYY"
              />
            </div>
          </div>
      </div>
    );
  }
}

PersonalForm.propTypes = {
  fields: PropTypes.object,
  questons: PropTypes.array,
  handleStateChange: PropTypes.func,
  showSsn: PropTypes.bool,
  onSsnChange : PropTypes.func,
  storedSsn: PropTypes.string,
  ssnError: PropTypes.string,
}

export default PersonalForm;
