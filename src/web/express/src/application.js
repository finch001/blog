const app = (exports = module.exports = {});

app.init = function() {
  this.setting = {};

  this.cache = {};
};

app.set = function() {};

app.engine = function() {};

app.render = function() {};

app.static = function() {
  console.log(process.cwd());
};
