import request from 'superagent';
import config from '../config';

const apiPort = config.apiPort || 8080;
const apiHost = config.apiHost || 'localhost';
let host = `http://dev.worthfm.com` ;
let redirectUrl = host + '/confirm-password';

// if (apiPort === 8080 && apiHost === 'localhost') {
//   host += `:${apiPort}`;
// }
//
//host = 'http://localhost:8080';
redirectUrl = 'http://localhost:3000/welcome';

function saveLocal(res) {
  const { uid, client, client_id} = res.headers;
  localStorage.accessToken = res.headers['access-token'];
  localStorage.uid = uid;
  localStorage.client  = client ? client : client_id;
}

function clearLocal() {
  delete localStorage.state_survey;
  delete localStorage.state_form;
  delete localStorage.state_auth;
}

/**
 * GET /api/questions
 */
export function getForm(cb) {
  const url = '/api/questions';

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

/**
 * POST /api/accounts
 */
export function sendPersonal(data, cb = () => {}) {
  const url = '/api/accounts';

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

/**
 * POST /api/question_answers
 */
export function sendQuestions(data, cb = () => {}) {
  const url = '/api/question_answers';

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

/**
 * POST /api/auth/sign_in
 */
export function login({ email, password, cb }) {
  const url = '/api/auth/sign_in';

  request
    .post(host + url)
    .send({email, password, 'access-token': localStorage.accessToken})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);

      clearLocal();

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

/**
 * POST /api/auth/password
 */
export function reset({ email, cb }) {
  request
    .post(host + '/api/auth/password')
    .send({email: email, redirect_url: redirectUrl})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);

      return cb(null, res.body);
    });
}

/**
 * POST /api/auth/password/edit
 */
export function checkResetPasswordToken(token, cb) {
  request
    .post(host + '/api/auth/password/edit')
    .send({reset_password_token: token, redirect_url: redirectUrl})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);

      return cb(null, res.body);
    });
}

/**
 * GET /api/auth/confirmation
 */
export function confirmEmailToken(token, cb) {
  request
    .get(host + '/api/auth/confirmation')
    .query({config: 'default'})
    .query({confirmation_token: token})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if ((res.body.errors && res.body.errors.length > 0) || res.body.error) return cb(res.body);
      saveLocal(res);

      return cb(null, res.body);
    });

}

/**
 * GET /api/auth/password/edit
 */
export function checkPasswordToken(token, cb) {
  request
    .get(host + '/api/auth/password/edit')
    .query({config: 'default'})
    .query({reset_password_token: token})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if ((res.body.errors && res.body.errors.length > 0) || res.body.error) return cb(res.body);

      return cb(null, res.body);
    });
}
/**
 * PUT /api/auth/password
 */
export function confirmPassword({ password, confirmPassword, client, accessToken, uid, cb }) {
  localStorage.accessToken = accessToken;
  localStorage.client = client;
  localStorage.uid = uid;

  request
    .put(host + '/api/auth/password')
    .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .send({password, password_confirmation: confirmPassword})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if (res.errors && res.errors.length > 0) return cb(res.body);
      saveLocal(res);
      return cb(null, { message: 'Success! Your password is updated and you will be logged into your account.'});
    });
}

/**
 * DELETE /api/auth/sign_out
 */
export function logout({ user = null, cb }) {
  request
    .del(host + '/api/auth/sign_out')
    .send({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);

      clearLocal();

      return cb(null, res.body);
    });
}


/**
 * POST /api/auth
 */
export function registration({ data, cb }) {
  request
    .post(host + '/api/auth')
    .send({
      ...data,
      'access-token': localStorage.accessToken,
      //confirm_success_url: 'http://localhost:3000/confirm-email'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond.');
      if (err) {
        if (res.body.errors && res.body.errors.full_messages && res.body.errors.full_messages.length > 0) {
          const error = res.body.errors.full_messages[0];
          return cb(error);
        }

        return cb('Unexpected error.');
      }

      clearLocal();

      localStorage.client = res.headers.client;
      localStorage.uid = data.email;
      localStorage.accessToken = res.headers['access-token'];

      return cb(null, {
        ...res.body,
        accessToken: res.headers['access-token'],
      });
    });
}
