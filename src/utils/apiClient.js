import request from 'superagent';
import config from '../config';

const apiPort = config.apiPort || 8080;
const apiHost = config.apiHost || 'localhost';
let host = `http://worthfm.4xxi.com` ;

// if (apiPort === 8080 && apiHost === 'localhost') {
//   host += `:${apiPort}`;
// }
//host = 'http://localhost:8000';

function saveLocal(res) {
  localStorage.accessToken = res.headers['access-token'];
  localStorage.uid = res.headers.uid;
  localStorage.client = res.headers.client;
}

export function getForm(cb) {
  request
    .get(host + '/api/questions')
    .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      saveLocal(res);
      console.log(res.body);
      return cb(null, {
        ...res.body,
      });
    });
}

export function sendPersonal(data, cb = () => {}) {
  request
    .post(host + '/api/accounts')
    //.set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .send({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client, ...data})
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      saveLocal(res);
      return cb(null, {
        ...res.body,
      });
    });
}

export function sendQuestions(data, cb = () => {}) {
  request
    .post(host + '/api/quesion_answers')
    .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .send(data)
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      saveLocal(res);
      return cb(null, {
        ...res.body,
      });
    });
}

export function login({ email, password, cb }) {
  request
    .post(host + '/api/auth/sign_in')
    .send({email, password, 'access-token': localStorage.accessToken})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      const { headers } = res;
      return cb(null, {
        accessToken: headers['access-token'],
        uid: headers.uid,
        client: headers.client,
        ...res.body,
      });
    });
}

export function reset({ email, cb }) {
  request
    .post(host + '/api/auth/password')
    .send({email: email, redirect_url: 'http://worthfm.4xxi.com/', 'access-token': localStorage.accessToken})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      const { headers } = res;
      return cb(null, {
        ...res.body,
        accessToken: headers['access-token'],
      });
    });
}

export function logout({ user = null, cb }) {
  request
    .del(host + '/api/auth/sign_out')
    .send({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
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
    .send({
      ...data,
      'access-token': localStorage.accessToken,
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.full_messages && res.errors.full_messages.length > 0) return cb(res.body);
      const { headers } = res;
      return cb(null, {
        ...res.body,
        accessToken: headers['access-token'],
      });
    });
}
