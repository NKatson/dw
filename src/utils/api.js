import request from 'superagent';
const host = 'http://localhost:8080';

export function login({ email, password, cb }) {
  request
    .post(host + '/api/login')
    .send({email, password})
    .set('Accept', 'application/json')
    .end((error, { body } = {}) => {
      if (error) return cb(body);
      return cb(null, body);
    });
}

export function logout({ user, cb }) {
  request
    .post(host + '/api/logout')
    .send(user.email)
    .set('Accept', 'application/json')
    .end((error, { body } = {}) => {
      if (error) return cb(body);
      return cb(null, body);
    });
}


export function registration({ data, cb }) {
  request
    .post(host + '/api/registration')
    .send(data)
    .set('Accept', 'application/json')
    .end((error, { body } = {}) => {
      if (error) return cb(body);
      return cb(null, body);
    });
}
