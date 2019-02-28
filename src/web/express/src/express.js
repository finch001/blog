const connect = require('./connect');
const mixin = require('merge-descriptors');
const expressProto = require('./application');

function createApplication() {
  var express = connect();
  // 修饰这个app
  mixin(express, expressProto, false);
  express.init();

  return express;
}

module.exports = createApplication;
