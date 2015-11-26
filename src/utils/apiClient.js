import request from 'superagent';
import config from '../config';

const apiPort = config.apiPort || 8080;
const apiHost = config.apiHost || 'localhost';
let host = `http://dev.worthfm.com` ;

// if (apiPort === 8080 && apiHost === 'localhost') {
//   host += `:${apiPort}`;
// }
//
//host = 'http://localhost:8080';

function saveLocal(res) {
  // console.log('uid    -> ' + localStorage.uid + ' to ' + res.headers.uid);
  // console.log('token  -> ' + localStorage.accessToken + ' to ' + res.headers['access-token']);
  // console.log('client -> ' + localStorage.client);
  // console.log('-------------------------------');
  localStorage.accessToken = res.headers['access-token'];
  localStorage.uid = res.headers.uid;
}

function beforeLog(url) {
  // console.log('Requesting...' + host + url);
  // console.log('TOKEN : ' + localStorage.accessToken);
  // console.log('UID : ' + localStorage.uid);
  // console.log('CLIENT: ' + localStorage.client);
}

export function getForm(cb) {
  const url = '/api/questions';
  beforeLog(url);

  request
    .get(host + url)
    .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
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

export function sendPersonal(data, cb = () => {}) {
  const url = '/api/accounts';
  beforeLog(url);

  request
    .post(host + url)
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

export function sendQuestions(data, cb = () => {}) {
  const url = '/api/question_answers';
  beforeLog(url);

  request
    .post(host + url)
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
  const url = '/api/auth/sign_in';
  beforeLog(url);

  request
    .post(host + url)
    .send({email, password, 'access-token': localStorage.accessToken})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);

      localStorage.client = res.headers.client;
      saveLocal(res);
      return cb(null, {
        accessToken: res.headers['access-token'],
        uid: res.headers.uid,
        client: res.headers.client,
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
      localStorage.client = res.headers.client;
      localStorage.uid = data.email;
      localStorage.accessToken = res.headers['access-token'];
      return cb(null, {
        ...res.body,
        accessToken: res.headers['access-token'],
      });
    });
}
