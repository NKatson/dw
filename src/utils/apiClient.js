import request from 'superagent';
import Cookies from 'js-cookie';

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

function setHeaders() {
  if (localStorage.uid && localStorage.uid.length > 0) {
    this.set({
        'access-token': localStorage.accessToken,
         uid: localStorage.uid,
        client: localStorage.client
      });
  }

  return this.set('Accept', 'application/json')
}

function saveLocal(res) {
  const { uid, client, client_id} = res.headers;
  localStorage.accessToken = res.headers['access-token'];
  localStorage.uid = uid;

  localStorage.client  = client ? client : client_id;

  if (uid.length !== 0 & typeof uid !== 'undefined') {
    //  Cookies.remove('uid', uid, {path: '/'});
      console.log('Set cookie: uid = ' + uid);
      Cookies.set('uid', uid, { expires: 7, path: '/' });
  }
}

function clearLocal() {
  Cookies.remove('uid', {path: '/'});
  delete localStorage.accessToken;
  delete localStorage.uid;
  delete localStorage.client;
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

/*
======================== API REQUESTS ===================
 */

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
  getConfig(config => {
    request
    .get(config.apiHost + '/api/questions')
    ::setHeaders()
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
    ::setHeaders()
    .send(data)
    .end((err, res) => {
        checkResponse(err, res, cb);
    });
  });
}

/**
 * PUT /api/accounts/type
 */
export function sendAccountType(data, cb) {
  const url = '/api/accounts/type';

  getConfig(config => {
    request
    .put(config.apiHost + url)
    ::setHeaders()
    .send({
      'account_type' : data.accountType,
      'joint_annual_income' : data.income,
    })
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
      ::setHeaders()
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
      ::setHeaders()
      .send({email, password})
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
 * GET /api/docusign
 */
export function getDocusignLink(cb = () => {}) {
  const docusitnUrl = '/api/docusign';
  getConfig(config => {
    request
      .get(config.apiHost + docusitnUrl)
      ::setHeaders()
      .query({'return_url': config.host + '/redirect-to-dashboard'})
      .end((err, res) => {
        checkResponse(err, res, cb);
      });
  })
}


/**
 * GET /api/steps/validation
 */
export function validateDocusign(cb = () => {}) {
  const validateUrl = '/api/steps/validation';
  getConfig(config => {
    request
      .get(config.apiHost + validateUrl)
      ::setHeaders()
      .end((err, res) => {
        checkResponse(err, res, cb  );
      });
  })
}

/**
 * POST /api/auth/password
 */
export function reset({ email, cb }) {
  getConfig(config => {
    request
      .post(config.apiHost + '/api/auth/password')
      ::setHeaders()
      .send({email: email})
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
    ::setHeaders()
    .send({reset_password_token: token})
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
    ::setHeaders()
    .query({config: 'default', confirmation_token: token})
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
    ::setHeaders()
    .query({config: 'default', unlock_token: token})
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
    ::setHeaders()
    .query({config: 'default', reset_password_token: token})
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
    ::setHeaders()
    .send({password, password_confirmation: confirmPassword})
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
    ::setHeaders()
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);

      clearLocal();

      request
        .get('/logout')
        .end((err, res) => {
            return cb(null, res.body);
        });
    });
  });
}

/**
 * POST /plaid/auth
 */
export function plaidAuth(publicToken, cb) {
  getConfig(config => {
    request
    .post(config.host + '/plaid/auth')
    .send({ publicToken })
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
      return cb(null, res.body);
    });
  });
}

/**
 * GET /plaid/banks
 */
export function plaidGetBanks(cb) {
  getConfig(config => {
    request
    .get(config.host + '/plaid/banks')
    .end((err, res) => {
      if (err && typeof res === 'undefined') return cb('Server does not respond');
      if (err) return cb(res.body);
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


/**
 * POST /api/tos/feedback
 */
export function sendFeedback(data, cb = () => {}) {
  getConfig(config => {
    request
    .post(config.apiHost + '/api/tos/feedback')
    ::setHeaders()
    .send(data)
    .end((err, res) => {
      checkResponse(err, res, cb);
    });
  });
}

/**
 * PUT /api/tos/accept
 */
export function acceptTerms(cb = () => {}) {
  getConfig(config => {
    request
    .put(config.apiHost + '/api/tos/accept')
    ::setHeaders()
    .end((err, res) => {
        checkResponse(err, res, cb);
    });
  });
}

/**
 * DELETE /api/tos
 */
export function cancelTerms(cb = () => {}) {
  getConfig(config => {
    request
    .delete(config.apiHost + '/api/tos')
    ::setHeaders()
    .end((err, res) => {
      checkResponse(err, res, cb);
    });
  });
};

/**
 * POST /api/manual_check
 */
export function sendCheckData(data, cb) {
  getConfig(config => {
    request
    .post(config.apiHost + '/api/manual_check')
    .send(data)
    ::setHeaders()
    .end((err, res) => {
      checkResponse(err, res, cb);
    });
  });
}

/**
 * POST /api/users/fund_actions
 */
export function sendPlaidData(data, cb = () => {}) {
  getConfig(config => {
    request
    .post(config.apiHost + '/api/users/fund_actions')
    .send({
      'bank_account_id' : data.plaid_account_id,
      'amount' : data.plaid_amount,
    })
    ::setHeaders()
    .end((err, res) => {
      checkResponse(err, res, cb);
    });
  });
}
