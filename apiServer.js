var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

app.post('/api/login', function (req, res) {
   const email = req.body.email;
   const password = req.body.password;

   if (email === 'user@user.com' && password === '1') {
     return res.status(200).json({
       'username': 'John Doe',
       'email': email
     });
   }

   return res.status(409).json('Sorry! That email and password combinations are not valid.');
});

app.post('/api/logout', function (req, res) {
   return res.status(200).json('OK!');
});

app.post('/api/register', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (email === 'user@user.com') {
    return res.status(409).json('Sorry! This email is already in use.');
  }

  return res.status(200).json({
    'username': 'John Doe',
    'email': email
  });
});

app.get('*', function (request, response){
  response.json({});
})

var server = app.listen(8080, function () {
  var host = 'localhost';
  var port = 8080;

  console.log('Example app listening at http://%s:%s', host, port);
});
