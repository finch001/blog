var obj = {};
var descriptor = Object.create(null);

// 默认没有 enumerable configurable writable
descriptor.value = 'static';

Object.defineProperty(obj, 'key', descriptor);



