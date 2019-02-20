var net = require('net')

var server = net.createServer(function(socket){
    socket.on('data', function(data){
        socket.write("请好");
    })
    
    socket.on('end', function(){
        console.log('连接断开');
    })
    
    socket.write("welcome here")
})

server.listen(8124, function(){
    console.log('server bound')
})

