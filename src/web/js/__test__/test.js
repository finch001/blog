const myPromise = require('./myPromise');

const promise = new myPromise((resolve, reject) => {
  resolve('hello');
});

promise.then(
  function(data) {
    console.log(data);
  },
  function(err) {
    console.log(err);
  }
);
