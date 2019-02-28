const http = require('http');
const express = require('./express');
const app = express();

const myLogger = function(req, res, next) {
  console.log('LOGGED');
  next();
};

const middleWare = function (req, res, next) {
  console.log('hello');
  next();
};

app.use(myLogger);
app.use(middleWare);

const server = http.createServer(app);

server.listen(8000);
