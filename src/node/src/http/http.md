## HTTP模块

在Nodejs中，http可以说是最核心的模块，同时也是比较复杂的一个模块。Node的http模块包含对HTTP处理的封装。在HTTP服务继承自TCP服务器，它能够与多个客户端保持连接，由于其采用事件驱动的形式，每一个新的连接不用开一个新的线程或进程，保持很低的内存占用。TCP服务以connection为单位进行服务，HTTP服务以request作为单位进行服务。http模块即是将connection到request的过程进行封装。

### 1. HTTP请求

对于tcp连接的读操作，http模块将其封装为serverRequest对象，**前面的报文头部将通过http_parser进行解析**。

~~~~~~~~
get / HTTP/1.1
User-agent: curl/123123 Openssl
Host: 127.0.0.1:
~~~~~~~~

请求的**报文体则抽象称为一个只读流对象**，如果业务逻辑需要读取报文体中的数据。

~~~~~~~
function(req,res){
    var buffers = [];
    
    req.on('data', function(trunk){
        buffers.push(trunk)
    }).on('end', function(){
        var buffers = Buffer.concat(buffers)
    })  
}

~~~~~~~

### 2. HTTP响应 

HTTP响应对象封装了对底层连接的写操作，可以将其看成一个可写的流对象。

- **响应报文头部信息**的API为res.setHeader()和res.writeHead()，
- 修改报文部的API为 res.write()  res.end()发送数据

报文头和报文体 都是可以多次调用res.setHeader 和res.write多次写入，但是只有调用res.writeHead和res.end才会写入连接中去。

### 3. HTTP服务的事件  

HTTP服务器也抽象了一些事件，服务器也是一个EventEmitter实例

- connection事件   在开始HTTP请求和响应前，客户端和服务端需要连接底层的TCP连接，当连接建立时，服务器触发一次connection事件
- request事件：  当建立tcp后，http模块底层将在数据流中抽象Http请求和http响应，当请求数据发送到服务器端，**在解析出http请求头后，将会触发该事件**。
- close事件： 
- checkContinue事件
- connect事件











