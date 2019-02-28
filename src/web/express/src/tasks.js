const mixin = require('merge-descriptors');
const prototype = {};

function createTask() {
  function app() {
    app.handle();
  }

  mixin(app, prototype, false);
  app.stack = [];
  return app;
}

prototype.use = function(fn) {
  this.stack.push(fn);
};

/**
 * 此处第三个参数是 next
 */
prototype.handle = function() {
  let index = 0;
  let stack = this.stack;
  // 此处递归循环
  function next() {
    let layer = stack[index++];

    // 此处递归完成
    if (layer === undefined) {
      return;
    }
    layer(next);
  }

  next();
};

exports = module.exports = createTask;
