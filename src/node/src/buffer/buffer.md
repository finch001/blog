## 理解Buffer

#### Buffer的结构

Buffer是一个像Array的对象，但是它主要用于操作字节，Buffer所占用的内存不是通过V8分配的，属于堆外内存。

###Buffer的对象

Buffer对象类似数组，它的元素为16进制的两位数，即0到255的数值

~~~~~~Js
var str = 'hello Node.js'
var buf = new Buffer(str, 'uft-8')
console.log(buf)
//  <Buffer 68 65 6c 6c 6f 20 4e 6f 64 65 2e 6a 73>
~~~~~~

Buffer的数据处理

- 给元素的赋值如果小于0，就将该值逐次加256，知道得到一个0到255之间的整数。
- 如果元素的值大于256，就将该值逐次减256，得到一个0到255之间的整数。
- 如果是小数，则直接舍弃小数部分，保留整数部分。

####Buffer内存分配

Buffer对象的内存分配不是在V8的堆内存中，而是在Node的C++C层面实现内存的申请的。为了高效的使用申请来的内存，Node采用了slab分配机制，slab是一种动态内存管理机制。

slab其实就是一块申请好的固定代销的内存区域，slab具有如下3中状态

- full: 完全分配状态
- partial: 部分分配状态
- empty: 没有被分配状态

Node以8KB为界限来区分Buffer是大对象还是小对象。

1. 分配小Buffer对象

   对于小对象，采用一个8KB的对象来分配内存。此时slab转变为partial的 表示部分分配了。

2. 分配大Buffer对象

   如果需要超过8kb的Buffer对象，将会只分配一个slowBuffer对象为slab单元。

#### Buffer的转换

Buffer对象可以与字符串之间相互转换，目前支持的字符串有如下这几种。

- ascii
- utf-8
- Base64
- Binary
- Hex

##### 字符串转Buffer

~~~~~~js
new Buffer(str, [encoding])
~~~~~~

##### Buffer转字符串

~~~~~~~~Js
const buf2Str = buf.toString('utf-8')
~~~~~~~~

#### Buffer的拼接

~~~~~~~js
const fs  = require('fs')

var readStream = fs.createReadStream('./hanzi.md', { highWaterMask: 11 })
let data = '';
readStream.on('data', (thunk) => {
  data += thunk // 此处有一个默认的toString()转换 导致乱码的原因
})

readStream.on('end', () => {
  console.log(data);
})
~~~~~~~

在Buffer的拼接经常出现乱码，因为buf.toString()方法默认以utf-8编码。中文字在UTF-8中占3个字节，在buffer的拼接中会出现字符阶段，导致字节转换为字符的时候出现乱码

解决办法一般有两个：

- setEncoding()

  该方法的作用是让data事件中传递的不再是一个Buffer对象，而是编码后的字符串。

  ~~~~~~
  var rs = fs.createReadStream('test.md', {highWaterMask: 11})
  rs.setEncoding('utf-8')
  ~~~~~~

  底层原因： 在调用setEncoding()时，可读流对象在内部设置了一个decoder对象。  每一次data事件都是有decoder对象进行Buffer后得到字符串的解码。

  decoder对象在得到编码后，得知汉字在utf-8编码下是3个字节的方式存储，所以每次调用decoder.write()写入，遇到汉字的三个字节不再阶段，而是缓存在一起后转码成一个汉字后再写入。

- 将所有的Buffer都加一起





