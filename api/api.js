import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../src/config';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === 'user@user.com' && password === '1') {
    return res.status(200).json({
      'username': 'John Doe',
      'email': email,
    });
  }

  return res.status(409).json('Sorry! That email and password combinations are not valid.');
});

app.post('/api/logout', (req, res) => {
  return res.status(200).json('OK!');
});

app.post('/api/register', (req, res) => {
  const email = req.body.email;

  if (email === 'user@user.com') {
    return res.status(409).json('Sorry! This email is already in use.');
  }

  return res.status(200).json({
    'username': 'John Doe',
    'email': email,
  });
});

app.post('/api/reset', (req, res) => {
  const email = req.body.email;

  if (email === 'user@user.com') {
    return res.status(200).json('OK');
  }

  return res.status(409).json('Sorry! That email is not registered with us.');
});

app.get('*', (req, res) => {
  res.json({});
});

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
  });
} else {
  console.error('==>     ERROR: No API PORT environment variable has been specified');
}
