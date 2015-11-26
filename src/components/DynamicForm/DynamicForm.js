import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { InputText, InputMultiple, Select, SsnInput } from '../../atoms/index';
import { validateSurvey as validate } from '../../utils/validation';
import * as api from '../../utils/apiClient';
import { blur, focus } from 'redux-form/lib/actions';

// const asyncValidate = (values) => {
//   console.log(values);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (['11/11/1111'].includes(values.date_of_birth)) {
//         reject({date_of_birth: 'That username is taken'});
//       } else {
//         resolve();
//       }
//     }, 1000); // simulate server latency
//   });
// };

class DynamicForm extends Component {
  getInputs(question, fields) {
    return question.answers.map((answer, index) => {
      return {
        label: answer.label,
        field: fields[answer.name],
        value: answer.value ? answer.value : answer.name,
      }
    });
  }
  componentDidMount() {
    let { questions, fields, dispatch } = this.props;
    questions.map((question, index) => {
      if (question.type === 'text' && question.defaultValue && question.name === 'first_name') {
        setTimeout(function() {
          dispatch(focus(question.name));
        }, 5000);

      }
    });
  }
  renderInput(question, fields) {
    const multipleTypes = ['checkbox', 'radio'];
    if (multipleTypes.indexOf(question.type) !== - 1) {
      const inputs = ::this.getInputs(question, fields);

      return <InputMultiple
              key={question.name}
              type={question.type}
              inputs={inputs}
              additionalClass={question.class ? question.class : ''}
              htmlName={question.htmlName}
              handleClick={this.props.formType === 'recommend' ? this.props.chooseAccount : null}
            />
    } else if (question.type === 'dropdown') {
      let result = [];
      const options = ::this.getInputs(question, fields);
      result.push(<Select
            field={fields[question.name]}
            key={question.name}
            label={question.label}
            additionalClass={question.class ? question.class : ''}
            options={question.answers}
            placeholder={question.placeholder}
            handleChange={this.props.handleSelectChange}
            />);
      // render child dynamic fields
      question.answers.map((answer, index) => {
        if (answer.dynamicFields && answer.dynamicFields.length > 0) {
          answer.dynamicFields.map((field, index) => {
            // is parent selected ?
            if (answer.label === this.props.stateSelectValue) {
              result.push(::this.renderInput(field, fields));
            }
          });
        }
      });

      return result;
    } else {
      const field = fields[question.name];
      if (question.defaultValue) {
      }
      return <InputText
                key={question.name}
                additionalClass={question.class ? question.class : ''}
                label={question.label}
                isNormalized={question.needNormalize ? true : false}
                field={field}
                defaultValue={question.defaultValue}
                type={question.type}
                placeholder={question.placeholder}
              />;
   }
  }
  renderQuestions(questions, fields) {
    let result = [];
    questions.map((question, index) => {

      // Ssn case
      if (question.name === 'ssn') {
          const { showSsn, storedSsn, formData, ssnError } = this.props;
          result.push(<div className="input-wrap__descr w-136" key="ssn-show-div">We will send your phone a text confirmation</div>);
          result.push(<SsnInput
                    key="ssn"
                    showSsn={showSsn}
                    onSsnChange={this.props.onSsnChange}
                    storedSsn={storedSsn}
                    ssnError={ssnError}
                    />);
          result.push(<div className="input-wrap input-wrap__descr w-136 input-wrap__addit-checkbox" key={question.name + "checkb"}>
                        <p className="radio-chbx-wrap">
                          <input type="checkbox" onClick={this.props.handleShowSsnClick} /> <label>Show</label>
                        </p>
                      </div>);
      } else {
          result.push(::this.renderInput(question, fields));
      }
    });
    return result;
  }
  render() {
    const { title, fields, questions, description, hint, categoryIndex, step, prevLink, nextLink, type } = this.props;
    return (
      <form className="common-form personal-info-form" onSubmit={this.props.handleSubmit}>
        <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
          {hint ? <p className="wfm-hint">{hint}</p> : null}
          {::this.renderQuestions(questions, fields)}
          <div className="clearfix pad-05">
              {this.props.children}
              {title == 'Markets move up and down. How comfortable are you with changes?' || type == 'recommend' ?
                <Link className="btn btn_blue w-308 pull-right" to={nextLink}>Next</Link>
               :
               <button className="btn btn_blue w-308 pull-right" disabled={this.props.disabledNext}>Submit </button>
             }
          </div>
    </form>
    );
  }
}

DynamicForm.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    questions: PropTypes.array.isRequired,
    hint: PropTypes.string,
    showSsn: PropTypes.bool,
    ssnValue: PropTypes.string,
    categoryIndex: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    stateSelectValue: PropTypes.string,
    handleShowSsnClick: PropTypes.func.isRequired,
    handleSelectChange: PropTypes.func.isRequired,
    prevLink: PropTypes.string.isRequired,
    nextLink: PropTypes.string.isRequired,
    formData: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    onSsnChange: PropTypes.func.isRequired,
    storedSsn : PropTypes.string,
    ssnError: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}
export default reduxForm({
  form: 'dynamic',
  validate,
  // asyncValidate,
  // asyncBlurFields: ['date_of_birth'],
  destroyOnUnmount: false,
}, null, mapDispatchToProps)(DynamicForm);
