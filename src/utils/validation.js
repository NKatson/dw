import moment from 'moment';

function checkRequired(data, fieldName, errors) {
  if (data.hasOwnProperty(fieldName) && !data[fieldName]) {
    errors[fieldName] = 'Required';
  }
  return errors;
}

function checkLength({ data, fieldName, errors, min }) {
  if (errors[fieldName]) return errors;

  if (data[fieldName] && data[fieldName].length < min) {
    errors[fieldName] = `Field must be minimum ${min} characters long`;
  }
  return errors;
}

function checkRegex({ data, fieldName, regex, errors, message }) {
  if (errors[fieldName]) return errors;

  if (data[fieldName] && !regex.test(data[fieldName])) {
    errors[fieldName] = message;
  }
  return errors;
}

export function authorization(data) {
  let errors = {};
  const emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  errors = checkRequired(data, 'email', errors);
  errors = checkRequired(data, 'password', errors);
  errors = checkRegex({ data, fieldName: 'email', regex: emailReg, errors, message: 'Please use valid email address'});

  return errors;
}

export function confirmPassword(data) {
  let errors = {};

  errors = checkRequired(data, 'password', errors);
  errors = checkRequired(data, 'confirmPassword', errors);

  if (data.password && !errors.password) {
    if (!/^(?=.*[A-Z]).*$/.test(data.password)) {
      errors.password = 'Password must contain at least one uppercase letter (A-Z)';
    } else if (!/^(?=.*[0-9]).*$/.test(data.password)) {
      errors.password = 'Password must contain at least one number (0-9)';
    }
  }
  if (data.password && data.confirmPassword && data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export function registration(data) {
  const errors = authorization(data);

  if (data.password && data.password.length < 8) {
    errors.password = 'Passwords must be minimum 8 characters long';
  }
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Please enter password again';
  }
  if (data.password && !errors.password) {
    if (!/^(?=.*[A-Z]).*$/.test(data.password)) {
      errors.password = 'Password must contain at least one uppercase letter (A-Z)';
    } else if (!/^(?=.*[0-9]).*$/.test(data.password)) {
      errors.password = 'Password must contain at least one number (0-9)';
    }
  }
  if (data.password && data.confirmPassword && data.confirmPassword !== data.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

function checkDateOfBirth(data, fieldName, errors, state) {
  if (errors[fieldName] || !data[fieldName]) return errors;

  const inputYearLength = data[fieldName].length;
  const currentYear = (new Date()).getFullYear();
  const [, month, day, year ] = /^(\d\d)\/(\d\d)\/(\d\d\d\d)$/.exec(data[fieldName]) || [];
  const min18States = [ 'CA', 'DC', 'KY', 'LA', 'ME', 'MI', 'NV', 'NJ', 'SD', 'OK', 'VA'];

  console.log(day, month, year);
  if (year < (currentYear - 100)
      || (currentYear - year) < 3
      || !(moment([year, day, month]).isValid())) {
    errors[fieldName] = 'Please type valid date format';
    return errors;
  }

  if ((currentYear - year) < 13 ) {
    errors[fieldName] = `I'm sorry, you must be 18 or over to create an account with WorthFM`;
    return errors;
  }

  if ((currentYear - year) < 18 ) {
    errors[fieldName] = `Most state laws require that you are 18 or older to setup investment accounts. Please double-check your birthdate - and if you're under 18, we'd love to see you again in a few years.`;
    return errors;
  }

  if (!state) {
    errors[fieldName] = 'Please select state';
    return errors;
  }

  if (state && min18States.indexOf(state) === -1 && (currentYear - year) < 21) {
    errors[fieldName] = `Most state laws require that you are 21 or older to setup investment accounts. Please double-check your birthdate - and if you're under 21, we'd love to see you again in a few years.`;
    return errors;
  }

  return errors;
}

function checkIncome(data, fieldName, errors) {
  if (errors[fieldName]) return errors;

  if (data[fieldName] && data[fieldName] < 8000) {
    errors[fieldName] = 'Please confirm your annual income.';
  }

  return errors;
}

export function validateSurvey(data) {
  let errors = {};
  const addressRegex = /^[a-zA-Z\- ,0-9\-\.]+$/i;
  const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/i;
  const phoneRegex = /(^\d{3}-\d{3}-\d{4}$)/i;
  const ssnRegex = /(^\d{9}$)/i;
  const _ssnRegex = /(^\d{3}-\d{2}-\d{4}$)/i;
  const dateOfBirthRegex = /(^\d{2}\/\d{2}\/\d{4}$)/i;
  const message = 'Valid characters include a-zA-Z, 0-9 and (._-)';
  const requiredFields = [
    'first_name', 'last_name', 'address', 'city', 'zip_code', 'phone',
   'date_of_birth', 'employer', 'title', 'industry_kind', 'annual_income', 
   'state', 'employment_status']; // add ssn

  requiredFields.forEach(fieldName => {
    errors = checkRequired(data, fieldName, errors);
    if (fieldName === 'annual_income') {
      errors = checkIncome(data, fieldName, errors);
    }
  });
  const minTwo = ['first_name', 'last_name', 'address', 'employer', 'title', 'industry_kind'];

  minTwo.forEach(elem => {
      errors = checkLength({ data, fieldName: elem, errors, min: 2 });
  });

  errors = checkRegex({ data, fieldName: 'address', regex: addressRegex, errors, message });
  errors = checkRegex({ data, fieldName: 'phone', regex: phoneRegex, errors, message: 'Please type valid phone format' });
  errors = checkRegex({ data, fieldName: 'city', regex: addressRegex, errors, message });
  errors = checkRegex({ data, fieldName: 'zip_code', regex: zipCodeRegex, errors, message: '5 numbers' });
  errors = checkRegex({ data, fieldName: 'date_of_birth', regex: dateOfBirthRegex, errors, message: 'Please type valid date format' });

  errors = checkDateOfBirth(data, 'date_of_birth', errors, data.state);
  return errors;
}
