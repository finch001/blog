#Stream
流是Node中的一个抽象接口，专门用来处理流数据的。
Node中很多实例都是流，比如 request to HTTP server process.stdout
所有的流都是EventEmitter的实例

## 流的API
### 流的分类
- Writable
  写入流  fs.createWriteStream()
- Readable
  读取流 fs.createReadStream()
- Duplex
  双工流 既可以读取也可以写入 net.Socket
- Transform
  在双工流上还可以修改或者转移数据，因为它即可写入也可以读取
除此之外 流常见还包括 pipeline finished
### Object Mode
所有的stream被创建都是用在string 或者 Buffer对象 或者 Uint8Array对象上面。 如果要对象JS其他对象做操作需要切换Stream的模式，一般不推荐这么做。

### Buffering
不管是`Writeable`还是`Readable`流都将数据存储在内部的缓存中，内部使用 `writeable.writableBuffer` 或者 `readable.readableBuffer`可以直接获取。

buffer能够存储的数据量主要是靠 `highWaterMark`来决定。 对于普通的流，`highWaterMark`决定的是存储的字节数量，如果是对象流则决定存储的对象。

通过stream.push(chunk)将数据存储在 `Readable`流中，如果流不调用 ` stream.read() ` 数据仍然还是会存储在内部的队列中。

`stream` 一个关键的方法便是Pipe，主要是限制源数据流和目的数据流之间的传输，防止之间传输超过了可用对象。



### API for Stream Consumers
一般对Stream的消费Api大多如下, 以一个比较常见的Http请求响应来举例:
~~~~~~js
const http  = require('http');
const server = http.createServer((req,res) => {
    let body = '';
    req.setEncoding('utf8');

    req.on('data', (chunk) =>{
        body +=chunk;
    })

    req.on('end', () => {
        try{
            const data = JSON.parse(body);
            res.write(typeof data);
            res.end();
        }catch(er){
            res.statusCode = 400;
            return res.end(`error ${er.message}`)
        }
    })
})

server.listen(1337);
~~~~~~
- data 事件 用来读取数据
- end 事件 表示流数据已经处理完
- setEncoding 设置编码
- write 方法用来写入数据
- end 方法表示流数据已经写完

stream都是EventEmitter的实例，  `Readable`通过事件来通知当前的流对象是否可用。

### Writeable Stream
数据写入的目的地，我们称之为Writeable streams。

`writeable stream ` 举例：
- Http request on the client
- Http responses, on the server
- fs write streams
- zlib streams
- crypto streams
- TCP sockets
- child process stdin
- process.stdout, process.stderr

上述有些还是双工流。

````js
const myStream = getWriteStreamSomehow();
myStream.write('Some data');
myStream.write('some more data');
myStream.end('done write data');

````

### Class: stream.Writeable
- Event: 'close'
  'close' 事件发生在stream 或者一些写入文件流已经断开，事件暗示了不会在会有任何事件发出
- Event: 'drain'
  如果 `stream.write(chunk)` 返回 `false` ，当有合适的时机来恢复写入数据到stream, 'drain'事件就会发生。
- Event: 'error'
  当` writing or piping data`出现错误会弹出 `error`。
- Event: 'finsh'
  当`stream.end()`调用的时候， 'finsh'事件就会发出，表示所有的数据都写入底层系统。
  ~~~~~~js
    const writer = getWriteableStream();
    for(leti = i; i < 100; i++){
        write.write(`hello, #${i}1\n`);
    }

    writer.end('This is the end\n');
    writer.on('finsh', () => {
        console.log('All write are now complete')
    })
  ~~~~~~    

- Event: 'pipe'
`src` 写入的数据
记住，所有的Pipe操作都是 读取流写入到写入流中。

````js
const writer = getWriter();
const reader = getReader();

writer.on('pipe', (src) => {
    console.log('something is piping into the writer');
    assert.equal(src, reader);
})

reader.pipe(writer);
````

- Event: 'end'
  - chunk  <string> <Buffer> <Uint8Array> <any>
  - encoding the encoding 如果chunk是字符串
  - callback  可选 表示stream结束

~~~~~js
const fs = require('fs');
const file = fs.createWriteStream('example.txt');
file.write('Hello, ');
file.end('world!');
~~~~~

- Writable.setDefaultEncoding(encoding)
默认设置的编码格式。

- Writable.writable
  表示是否可读
- writable.writeHighWaterMark
  表示当前的流的存储尺寸
- writable.writableLength
  表示当前的流还能存储多少
- writable.write(chunk, encoding, callback)
  写入方法

## 如何实现一个流
