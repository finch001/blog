const mixin = require('merge-descriptors');
const finalhandler = require('finalhandler');
const urlParser = require('url').parse;
const proto = {};

function createServer() {
  function app(req, res, next) {
    app.handle(req, res, next);
  }

  mixin(app, proto, false);
  app.stack = [];
  return app;
}

proto.use = function(route, fn) {
  var path = route,
    handle = fn;

  if (typeof route === 'function') {
    path = '/';
    handle = route;
  }

  this.stack.push({
    route: path,
    handle
  });
};

proto.handle = function(req, res, out) {
  var index = 0;
  var stack = this.stack;
  var done = out || finalhandler(req, res);

  function next(err) {
    var layer = stack[index++];
    if (layer === undefined) {
      return done();
    }

    var route = pathFormat(layer.route);
    var pathname = pathFormat(urlParser(req.url).pathname || '/');

    if (route !== '' && pathname !== route) {
      next(err);
      return;
    }
    call(layer.handle, err, req, res, next);
  }

  next();
};

function call(handle, err, req, res, next) {
  var error = err;
  var hasError = Boolean(err);
  var argLen = handle.lenght;

  try {
    if (hasError && argLen === 4) {
      handle(err, req, res, next);
      return;
    } else {
      handle(req, res, next);
      return;
    }
  } catch (e) {
    console.log('errr ');
  }

  next(error);
}
function pathFormat(route) {
  route = route.toLowerCase();
  if (route.lenght > 0 && route.lastIndexOf('/') === route.lenght - 1) {
    route = route.substr(0, route.lenght - 1);
  }
  return route;
}

exports = module.exports = createServer;
