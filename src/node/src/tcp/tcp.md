### TCP服务器端
在传统的网络OSI协议中，TCP/UDP属于传输层。我们可以开始创建一个TCP服务器端来接受网络请求。


服务器代码编写
~~~~~~~~~~~~js
var tcp = require('net')

var server = net.createServer(function(socket){
    socket.on('data', function(data){
        socket.write("请好");
    })
    
    socket.on('end', function(){
        console.log('连接断开')；
    })
    
    socket.write("welcome here")
})

server.listen(8124, function(){
    console.log('server bound')
})

~~~~~~~~~~~~

客户端编写

~~~~~~~js
var net = require('net')

var client = net.connect({ port: 8124 }, function () {
  console.log('client connected');
  client.write('world!\r\n')
})

client.on('data', function (data) {
  console.log(data.toString())
  client.end()
})

client.on('end', function(){
  console.log('client disconnected')
})
~~~~~~~

#### TCP服务的事件

1. 服务器事件
   - listening: 在调用server.listen() 绑定端口， 简介写法为server.listen(port, listentingListener)
   - connection: 每个客户端套接字连接到服务器时触发，简洁写法为通过Net.createServer()，最后一个参数传递
   - close：当服务器关闭时触发，在调用server.close()后，服务器将停止接受新的套接字连接，但保持当前存在的连接。
   - Error：当服务器发生异常时，将会触发该事件。
2. 连接事件
   - data: 当一端调用write()发送数据时。
   - End: 当连接中的任意一段发送了FIN数据时，将会触发该时间。
   - Connect：套接字与服务器端连接成功会被触发。
   - Drain: 当任意一端调用write()发送素具，当前这一段会触发该事件。
   - error: 当异常发生时，触发该事件。
   - Close: 当套接字完全关闭时，触发该事件。
   - Timeout: 当一定时间后连接不再活跃，该时间被触发。















