const fs = require('fs')

var str = 'hello Node.js'
var buf = new Buffer(str, 'utf-8')
console.log(buf)

const buf2Str = buf.toString('utf-8')
console.log(buf2Str)

var readStream = fs.createReadStream('./hanzi.md', { highWaterMask: 11 })
let data = '';
readStream.on('data', (thunk) => {
  data += thunk
})

readStream.on('end', () => {
  console.log(data);
})



