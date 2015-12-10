import request from 'superagent';

function getConfig(cb) {
  request.get('/config').end((err, res) => {
    if (err) return { host: 'localhost:3000', apiHost: 'http://dev.worthfm.com' };

    let { apiPort = 8080, apiHost = 'localhost', host = 'localhost', port = 3000 } = res.body;

    host = `http://${host}`;
    apiHost = `http://${apiHost}`;

    if (host === 'http://localhost') {
      host = `${host}:${port}`;
    }

    return cb({ host, apiHost });
  });
}

function saveLocal(res) {
  const { uid, client, client_id} = res.headers;
  localStorage.accessToken = res.headers['access-token'];
  localStorage.uid = uid;
  localStorage.client  = client ? client : client_id;
  document.cookie = `uid=${uid}`;
}

function clearLocal() {
  document.cookie = `uid=`;
}

function checkResponse(err, res, cb) {
  if (err && typeof res === 'undefined') return cb('Server does not respond');
  if (err) return cb(res.body);
  if (res.body.errors && res.body.errors.length > 0 || res.body.error) return cb(res.body);

  if (typeof res.headers['access-token'] !== 'undefined') {
    saveLocal(res);
  }

  return cb(null, res.body);
}

export function saveState(state, cb) {
  const url = '/state/create';

  getConfig(config => {
    request
    .post(config.host + url)
    .send({
      state,
      uid: localStorage.uid,
    })
    .end((err, res) => {
      if (err) return cb(err);
        cb(null);
    });
  });
}

/**
 * GET /api/questions
 */
export function getForm(cb) {
  const url = '/api/questions';
  getConfig(config => {
    request
    .get(config.apiHost + url)
    .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .end((err, res) => {
        checkResponse(err, res, cb);
    });
  });
}

/**
 * POST /api/accounts
 */
export function sendPersonal(data, cb = () => {}) {
  const url = '/api/accounts';

  getConfig(config => {
    request
    .post(config.apiHost + url)
    .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .send(data)
    .end((err, res) => {
        checkResponse(err, res, cb);
    });
  });
}

/**
 * POST /api/question_answers
 */
export function sendQuestions(data, cb = () => {}) {
  const url = '/api/question_answers';
  getConfig(config => {
    request
      .post(config.apiHost + url)
      .set({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
      .send(data)
      .end((err, res) => {
          checkResponse(err, res, cb);
      });
  });
}

/**
 * POST /api/auth/sign_in
 */
export function login({ email, password, cb }) {
  const url = '/api/auth/sign_in';
  getConfig(config => {
    request
      .post(config.apiHost + url)
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
  });
}

/**
 * POST /api/auth/password
 */
export function reset({ email, cb }) {
  getConfig(config => {
    request
      .post(config.apiHost + '/api/auth/password')
      .send({email: email})
      .set('Accept', 'application/json')
      .end((err, res) => {
          checkResponse(err, res, cb);
      });
  });
}

/**
 * POST /api/auth/password/edit
 */
export function checkResetPasswordToken(token, cb) {
  getConfig(config => {
    request
    .post(config.apiHost + '/api/auth/password/edit')
    .send({reset_password_token: token})
    .set('Accept', 'application/json')
    .end((err, res) => {
        checkResponse(err, res, cb);
    });
  });
}

/**
 * GET /api/auth/confirmation
 */
export function confirmEmailToken(token, cb) {
  getConfig(config => {
    request
    .get(config.apiHost + '/api/auth/confirmation')
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
  });
}


/**
 * GET /api/auth/confirmation
 */
export function unlockToken(token, cb) {
  getConfig(config => {
    request
    .get(config.apiHost + '/api/auth/unlock')
    .query({config: 'default'})
    .query({unlock_token: token})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body.error);

      return cb(null, res.body.message);
    });
  });
}

/**
 * GET /api/auth/password/edit
 */
export function checkPasswordToken(token, cb) {
  getConfig(config => {
    request
    .get(config.apiHost + '/api/auth/password/edit')
    .query({config: 'default'})
    .query({reset_password_token: token})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      if ((res.body.errors && res.body.errors.length > 0) || res.body.error) return cb(res.body);

      return cb(null, res.body);
    });
  });
}
/**
 * PUT /api/auth/password
 */
export function confirmPassword({ password, confirmPassword, client, accessToken, uid, cb }) {
  localStorage.accessToken = accessToken;
  localStorage.client = client;
  localStorage.uid = uid;

  getConfig(config => {
    request
    .put(config.apiHost + '/api/auth/password')
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
  });
}

/**
 * DELETE /api/auth/sign_out
 */
export function logout({ user = null, cb = () => {} }) {
  getConfig(config => {
    request
    .del(config.apiHost + '/api/auth/sign_out')
    .send({'access-token': localStorage.accessToken, uid: localStorage.uid, client: localStorage.client})
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      clearLocal();
      return cb(null, res.body);
    });
  });
}


/**
 * POST /api/auth
 */
export function registration({ data, cb }) {
  getConfig(config => {
    request
    .post(config.apiHost + '/api/auth')
    .send({
      ...data,
      'access-token': localStorage.accessToken,
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
  });
}
