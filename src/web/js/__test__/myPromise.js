function Promise(executor) {
  let self = this;

  self.onResolvedCallbacks = [];
  self.onRejectedCallbacls = [];
  self.status = 'pending';
  self.value = null;
  self.reason = null;

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled';
      self.value = value;

      self.onResolvedCallbacks.forEach(fn => fn());
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'reject';
      self.reason = reason;

      self.onRejectedCallbacls.forEach(fn => fn());
    }
  }
  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;

  let promise2 = null;

  if (self.status === 'fulfilled') {
    promise2 = new Promise((resolve, reject) => {
      onFulfilled(self.value);
    });
  }

  if (self.status === 'rejected') {
    promise2 = new Promise(function(resolve, reject) {
      onRejected(self.reason);
    });
  }

  if (self.status === 'pending') {
    promise2 = new Promise((resolve, reject) => {
      self.onResolvedCallbacks.push(function() {
        try {
          onFulfilled(self.value);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push(function() {
        try {
          onRejected(self.reason);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
};

exports = module.exports = Promise;
