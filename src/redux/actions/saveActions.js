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

function getPersonal(formData) {
  if (!formData) return {};
  
  let data = {};
  
  // personal
  data = Object.assign({}, data, getCommon(formData.basicinfo));
  data.first_name = 'Emily';
  data.last_name = 'Jipson';
  
  
  // employment
  data = Object.assign({}, data, getCommon(formData.employment));
  if (data.annual_income) {
    let val = data.annual_income.replace(/[,\$\s]/g, '');
    data.annual_income = parseInt(val);  
  }
  return data;
}



function getEmployment(formData) {
  if (!formData) return {};
  data = Object.assign({}, data, getCommon(formData.employment));
  return data;
}

export function savePersonal(formData, cb = () => {}) {
  api.sendPersonal(grapPersonal(formData), () => {
    api.saveEmployment(grapEmployment(formData), () => {
      cb();  
    });
  });
}