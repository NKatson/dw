import request from 'superagent';
import config from '../config';

const apiPort = config.apiPort || 8080;
const apiHost = config.apiHost || 'localhost';

const host = `http://${apiHost}:${apiPort}`;

export function login({ email, password, cb }) {
  request
    .post(host + '/api/sign_in')
    .send({email, password})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      return cb(null, res.body);
    });
}

export function reset({ email, cb }) {
  request
    .post(host + '/api/password')
    .send({email})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      return cb(null, res.body);
    });
}

export function logout({ user, cb }) {
  request
    .post(host + '/api/sign_out')
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
    .post(host + '/api/auth')
    .send(data)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.full_messages && res.errors.full_messages.length > 0) return cb(res.body);
      return cb(null, res.body);
    });
}
