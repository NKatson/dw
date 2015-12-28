import * as api from '../../utils/apiClient';

function getCommon(form) {
  const data = {};
  if (!form) return data;

  for (let key in form) {
    if (key.charAt(0) !== '_') {
      data[key] = form[key].value;
    }
  }

  return data;
}

function currentcyToNumber(value) {
  if (!value) return 0;
  if (typeof a === 'number') return value;
  console.log(value);

  let val = value.replace(/[,\$\s]/g, '');
  return  parseInt(val);
}


function getEmployment(formData) {
  if (!formData) return {};
  const data = getCommon(formData.employment);
  data.annual_income = currentcyToNumber(data.annual_income);
  return data;
}

function getPersonal(formData) {
  if (!formData) return {};

  let data = {};

  // personal
  data = getCommon(formData.basicinfo);
  data.first_name = 'Emily';
  data.last_name = 'Jipson';

  // employment
  data = Object.assign({}, data, getEmployment(formData));

  return data;
}

// ============== ACTIONS ==================

export function savePersonal(formData, cb = () => {}) {
  api.sendPersonal(getPersonal(formData), () => {
    api.sendQuestions(getEmployment(formData), () => {
      cb();
    });
  });
}

export function saveQuestions(formData, cb = () => {}) {
  api.sendQuestions(getCommon(formData), () => {
    cb();
  });
}

export function saveState(state, cb = () => {}) {
  api.saveState(state, err => {
    if (err) return console.log(err);
    cb();
  });
}

export function saveCheck(formData, cb = () => {}) {
  const data = getCommon(formData);
  data.amountOfTransaction = currentcyToNumber(data.amountOfTransaction);

  api.sendCheckData(data, () => {
    cb();
  });
}

export function savePlaidData(formData) {
  const data = getCommon(formData);
  data.plaid_amount = currentcyToNumber(data.plaid_amount);

  api.sendPlaidData(data);
}
