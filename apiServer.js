var nock = require('nock');
var express = require('express');
var app = express();

nock('http://localhost:2000/')
  .get('auth', {
    email: 'example@gmail.com',
    password: 'Passworrrd',
  })
  .reply(200, {
    _id: '123ABC',
    _rev: '946B7D1C',
    username: 'pgte',
    email: 'pedro.teixeira@gmail.com',
  });

app.listen(2000, function () {
  var host = 'localhost';
  var port = 2000;

  console.log('Mock server is listening at http://%s:%s', host, port);
});
