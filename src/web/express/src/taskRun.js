const tasks = require('./tasks')();

tasks.use(next => {
  console.log('hello');
  next();
});

tasks.use(next => {
  console.log('world');
  next();
});

tasks();
