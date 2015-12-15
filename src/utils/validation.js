import moment from 'moment';

class Validation {
  constructor(data) {
    this.data = data;
    this.errors = {};
  }
  getErrors() {
    return this.errors;
  }
  checkRequired(fieldName, message = 'Required') {
    if (this.data.hasOwnProperty(fieldName)) {
      if (!this.data[fieldName] || this.data[fieldName].trim() === '') {
        this.errors[fieldName] = message;
      }
      if (this.data[fieldName] === 'default') {
        this.errors[fieldName] = message;
      }
    }
  }
  checkRegex(fieldName, regex, message) {
    if (this.errors[fieldName]) return;
    if (this.data[fieldName] && !regex.test(this.data[fieldName])) {
      this.errors[fieldName] = message;
    }
  }
  checkLength(fieldName, min) {
    if (this.errors[fieldName]) return;

    if (this.data[fieldName] && this.data[fieldName].length < min) {
      this.errors[fieldName] = `Field must be minimum ${min} characters long`;
    }
  }
  checkCurrency(fieldName, min, message) {
    if (this.errors[fieldName] || !this.data[fieldName]) return;

    if (this.data[fieldName] === '$ ') {
      this.errors[fieldName] = 'Required';
      return;
    }

    let val = this.data[fieldName].replace(/[,\$\s]/g, '');
    val = parseInt(val);

    if (val < min) {
      this.errors[fieldName] = message;
    }
  }
  checkDateOfBirth(fieldName) {
    if (this.errors[fieldName] || !this.data[fieldName]) return;

    let [, month, day, year ] = /^(\d\d)\/(\d\d)\/(\d\d\d\d)$/.exec(this.data[fieldName]) || [];
    const min18States = [
      'California', 'District of Columbia', 'Kentucky',
      'Louisiana', 'Maine', 'Michigan', 'Nevada', 'New Jersey',
      'South Dakota', 'Oklahoma', 'Virginia'];
    const state = this.data['state'];

    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);

    month = month - 1;

    const diff = moment().diff([year, month, day], 'years');

    if (!moment([year, month, day]).isValid()) {
      this.errors[fieldName] = 'Please type valid date format.';
    } else if (moment().diff([year, month, day]) < 0) {
      this.errors[fieldName] = "Thanks for your interest! When you're born let us know!";
    } else if (diff > 100) {
      this.errors[fieldName] = 'Thanks for your interest! You must be 100 years old or younger to create an account';
    } else if (diff < 18 ) {
      this. errors[fieldName] = 'You must be 18 years or older to create a WorthFM account.';
    } else if (!state || state === 'default') {
      this.errors[fieldName] = 'Please select your state.';
    } else if (state && min18States.indexOf(state) === -1 && diff < 21) {
      this.errors[fieldName] = 'You must be 21 years or older to create a WorthFM account.';
    }
  }
  checkPassword() {
    if (this.errors.password) return;

    if (this.data.password && this.data.password.length < 8) {
      this.errors.password = 'Passwords must be minimum 8 characters long';
      return;
    }

    if (!/^(?=.*[A-Z]).*$/.test(this.data.password)) {
      this.errors.password = 'Password must contain at least one uppercase letter (A-Z)';
    } else if (!/^(?=.*[0-9]).*$/.test(this.data.password)) {
      this.errors.password = 'Password must contain at least one number (0-9)';
    }
  }
  checkPasswordsEqual() {
    if (this.data.password && this.data.confirmPassword && this.data.confirmPassword !== this.data.password) {
      this.errors.confirmPassword = 'Passwords do not match';
    }
  }
}

export function registration(data) {
  const valid = new Validation(data);
  const emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  valid.checkRequired('email', 'Your email address is required.');
  valid.checkRequired('firstName', 'Your first name is required.');
  valid.checkRequired('lastName', 'Your last name is required.');

  valid.checkRegex('email', emailReg, 'Please use valid email address.');

  valid.checkRequired('password', 'Enter your password.');
  valid.checkRequired('confirmPassword', 'Please enter password again.');

  valid.checkPassword();
  valid.checkPasswordsEqual();

  return valid.getErrors();
}

export function validateSurvey(data) {
  const valid = new Validation(data);

  const addressRegex = /^[a-zA-Z\- ,0-9\-\.]+$/i;
  const zipCodeRegex = /(^\d{5}$)|(^\d{6}$)/i;
  const phoneRegex = /(^\d{3}-\d{3}-\d{4}$)/i;
  const ssnRegex = /(^\d{3}-\d{2}-\d{4}$)/i;
  const dateOfBirthRegex = /(^\d{2}\/\d{2}\/\d{4}$)/i;
  const requiredFields = [
    'first_name',
    'last_name',
    'address',
    'city',
    'zip_code',
    'phone',
    'date_of_birth',
    'employer',
    'title',
    'industry_kind',
    'state',
    'employment_status',
    'ssn',
    'annual_income',
    'income_source',
    'bank_connected_how_much',
    'citizen',
    'bank_name',
    'account_name',
    'routing_number',
    'routing_name',
    'account_number',
 ];

  requiredFields.forEach(fieldName => {
    valid.checkRequired(fieldName);
  });

  valid.checkRegex('date_of_birth', dateOfBirthRegex, 'Please type a valid date (MM/DD/YYYY)');
  valid.checkRegex('ssn', ssnRegex, 'Please type valide SSN');
  valid.checkRegex('phone', phoneRegex, 'Please type valid phone format');
  valid.checkRegex('city', addressRegex, 'Please type valid city format');
  valid.checkRegex('zip_code', zipCodeRegex, '5 or 6 numbers');

  valid.checkDateOfBirth('date_of_birth');
  valid.checkCurrency('annual_income', 8000, 'Please confirm your annual income.');
  valid.checkCurrency('bank_connected_how_much', 25, 'Minimum amount is $25. Please double check your initial funding amount.');

  return valid.getErrors();
}
