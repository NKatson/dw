import request from 'superagent';
import config from '../config';

const apiPort = config.apiPort || 'localhost';
const apiHost = config.apiHost || 8080;

const host = `http://${apiPort}:${apiHost}`;

export function login({ email, password, cb }) {
  request
    .post(host + '/api/login')
    .send({email, password})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      return cb(null, res.body);
    });
}

export function reset({ email, cb }) {
  request
    .post(host + '/api/reset')
    .send({email})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      return cb(null, res.body);
    });
}

export function logout({ user, cb }) {
  request
    .post(host + '/api/logout')
    .send(user.email)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      return cb(null, res.body);
    });
}


export function registration({ data, cb }) {
  request
    .post(host + '/api/register')
    .send(data)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      return cb(null, res.body);
    });
}
