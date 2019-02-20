const test = require('./test')

var hello = { a: 10 }
test.change(hello)
console.log(hello)