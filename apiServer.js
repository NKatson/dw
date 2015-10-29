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

   return res.status(404).json('Incorrect email or password');
});

app.post('/api/register', function (req, res) {
  res.status(200).json({
    'username': 'John Doe',
    'role': 'ADMIN',
    'email': 'example@asdf.com'
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
