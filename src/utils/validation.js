export function authorization(data) {
  const errors = {};
  if (!data.email) {
    errors.email = 'Required';
  }
  if (!data.password) {
    errors.password = 'Required';
  }
  const emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (data.email && !emailReg.test(data.email)) {
    errors.email = 'Please use valid email address';
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
    errors.confirmPassword = 'Passwords must be equal';
  }
  return errors;
}

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

function checkIncome(data, fieldName, errors) {
  if (errors[fieldName]) return errors;

  if (data[fieldName] && data[fieldName] < 8000) {
    errors[fieldName] = 'Please confirm your annual income.';
  }

  return errors;
}

export function validateSurvey(data) {
  let errors = {};
  console.log(data);
  const addressRegex = /^[a-zA-Z\- ,0-9\-\.]+$/i;
  const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/i;
  const phoneRegex = /(^\d{3}-\d{3}-\d{4}$)/i;
  const ssnRegex = /(^\d{3}-\d{2}-\d{3}$)/i;
  const dateOfBirthRegex = /(^\d{2}\/\d{2}\/\d{4}$)/i;
  const message = 'Valid characters include a-zA-Z, 0-9 and (._-)';
  const requiredFields = ['first_name', 'last_name', 'address', 'city', 'zip_code', 'phone', 'ssn', 'date_of_birth', 'employer', 'title', 'industry_kind', 'annual_income'];

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
  errors = checkRegex({ data, fieldName: 'ssn', regex: ssnRegex, errors, message: 'Please type valid SSN format' });
  errors = checkRegex({ data, fieldName: 'city', regex: addressRegex, errors, message });
  errors = checkRegex({ data, fieldName: 'zip_code', regex: zipCodeRegex, errors, message: '5 numbers' });
  errors = checkRegex({ data, fieldName: 'date_of_birth', regex: dateOfBirthRegex, errors, message: 'Please type valid date format' });

  return errors;
}
