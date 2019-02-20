## 构建web应用

由于Node.js天然对web开始的优势，所有我们这章用Node的原生api，在web具体业务中，我们可能有需要如下的需求

- 请求方法的判断
- URL的路径解析
- URL中查询字符串解析
- Cookie的解析
- Basic认证
- 表单数据的解析
- 任意格式文件的上传处理
- Session的需求

可见原生API的使用需要满足日常的开始还是远远不够的，但是要慢慢实现这些需求也并非难事，一切的一切，其实都可以从这个函数开始：

~~~~~~~js
function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end()
}
~~~~~~~



#### 1. 请求方法

在web应用，最常见的请求方法是GET和POST，除此以外，还有HEAD、DELETE、PUT、OPTION，请求方法存在报文的第一行的第一个单词，通常是大写的

~~~~~~~
> GET /path?foo=baz HTTP/1.1
> User-Agent: 
> Host: 
> Accept: 
~~~~~~~

在HTTP_Parser在解析请求报文的时候，将报文头抽取出来，设置为req.method。

RESTFul类web服务中请求方法十分重要。 1. put代表新建一个资源， 2. POST 表示要更新一个资源 3. GET表示查看一个资源 4. Delete表示删除一个资源

~~~~~~~~~Js
function(req, res){
    switch(req.method){
     case 'POST':{
         update(req, res)
         break;
     } 
     case 'PUT':{
         create(req, res)
         break;
     }
     
     case 'DELETE':{
         remove(req, res)
         break;
     }
     
     case 'GET': 
     default: {
            get(req, res)
        }
    }    
}
~~~~~~~~~

### 2. 路径解析

除了根据请求方法，最常见的请求判断便是根据路径的判断了。路径部分存在与报文的第一行的第二部分。

> GET /path?foo=bar HTTP/1.1

Http_Parser将其解析为req.url，一般一个完整的URL地址如下

> http://user:pass@host.com:8080 /p/a/t/h?query=string#hash

地址解析成报文，将路径和查询部分放在报文第一行，hash部分会被丢弃，不会存在报文的任何地方。

- 静态文件服务器

  根据请求的路径,来查询磁盘中的文件，然后响应到客户端

  ~~~~~~
  function(req, res){
      var pathname = url.parse(req.url).pathname;
      
      fs.readfile(path.join(ROOT, pathname), funtion(err, file){
          if(err){
          	res.writeHead(404)    
          	res.end('找不到文件')
          	return;
          }
          res.writeHead(200);
          res.end(file)
      })
  }
  ~~~~~~

### 3. 查询字符串

在地址栏中路径后的？foo=bar & baz=val字符串就是查询字符串。这个字符串会更随在路径后，node提供了queryString模块用于处理这部分数据

~~~~~
var url = require('url')
var queryString = require('queryString')

var query = queryString.parse(url.parse(req.url).query);
~~~~~

 它会将foo=bar&baz=val解析为一个JSON对象

~~~
{
    foo: 'bar',
    baz: 'val'
}
~~~

### 4. Cookie

HTTP是一个无状态的协议，如何识别和认证一个用户，最早的方案便是cookie.

cookie的处理流程如下：

1. 服务器想客户端发送cookie
2. 浏览器保存cookie
3. 之后每次浏览器都会将cookie发送服务器

cookie的解析也是非常的简单

~~~~~~~
var parseCookie = function(cookie){
    var cookies = {}
    if(!cookie){
     return cookies;   
    }
    
    var list = cookie.split(';')
    for(var i = 0; i< list.length; i++){
        var pair = list[i].split('=')
        cookies[pair[0].trim()] = pair[1]
    }
    return cookies;
}
~~~~~~~

服务器是通过想客户端发送响应报文实现的，响应的Cookie值在Set-Cookie字段上，它的格式与请求的格式不太一样，规范如下

> Set-cookie: name=value; path=/; Expires=Sun. 23-apr-23 09:01:35 GMT; Domain=.domain.com;

- Path表示这个Cookie影响的路径，当前访问的路径不满足该匹配时，浏览器则不发送这个Cookie
- Expire Max-Age是用来告知浏览器这个Cookie何时过期的。

Cookie的性能影响

由于Cookie的实现机制，会导致每一次客户端请求都会发送这个Cookie到服务器端，一旦设置的Cookie过多，会导致报头较大，然而大多数的Cookie并不需要每次都用上。

### 5. Session

cookie的问题很明显，1. 可能出现体积过大，2. 因为cookie可以在前后端进行修改。因为数据很容易被修改和伪造。

为了解决Cookie敏感数据的问题，Session出现了，session的数据值保存在服务器端，客户端无法修改，这样数据的安全性得到一定的而保证。

通常的实现方式是基于Cookie来实现用户和数据的映射

虽然将所有的数据都放在Cookie是不可取的，但是我们可以将口令放在cookie还是可以的，因为口令一旦被篡改了，就丢失了映射关系，也无法修改服务器的数据，并且session的有效期通常比较短，一旦就是20分钟，如果20分钟客户端和服务器端没有交互产生，服务器就会将数据删除。

一旦服务器启用了Session，将会约定一个键值作为Session的口令，一旦服务器检查到用户请求没有携带Cookie，就会自定位置生成一个值，这个值是唯一并且不重复的值，并设置超时时间。

~~~~~~~
var sessions = {};
var key = 'sessions_id';
var EXPIRES = 20 * 60 * 1000

var generate = function(){
    var session = {};
    
    session.id = (new Date()).getTime() + Math.random();
    session.cookie = {
        expire: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session
    return session;
}
~~~~~~~

### 6. 数据上传

Node的http模块只对HTTP报文的头部进行解析，并触发request事件，如果请求还带有内容部分，通过报头的Transfer-Encoding或Content-Length即可判断请求中是否带有内容

~~~~~~~
var hasBody = function(req){
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers;	
}
~~~~~~~

在Http_parser解析报头结束后，报文内容部分会通过data事件触发，我们只需要以流的方式处理即可

~~~~~~~
function(req, res){
    if(hasBody(req)){
        var buffers = [];
        req.on('data', function(chunk){
            buffers.push(chunk)
        })
        
        req.on('end', function(){
            req.rawBody = Buffer.concat(buffers).toString()
            handle(req,res)
        })
    }else{
        handle(req, res)
    }
}
~~~~~~~

将接受到熬的Buffer列表转化为一个Buffer对象后，再转化为一个没有乱码的字符串，暂时挂载在req.rawBody处。

### 7. 表单数据

1. 最常见的表单提交

请求头中的Content-Type字段为application/x-www-form-urlencoded

报文体内容和查询字符串相同

> key=value&key=value

2. 常见的提交还有Json xml，

   判断的依据Content-Type中的值来决定，其中JSON的值为application/json, XML的值为application/xml

   **Content-type中还可以携带了编码信息**

> Content-Type: applicaiton/json; charset = utf-8

3. 附件上传

   有时候业务需要直接文件上传，需要指定表单属性 enctype/multipart/form-data

   浏览器在遇见multipart/form-data表单提交时，构造的请求报文和普通表单完全不一样，首先它的报头中最为特殊的如下

   > Content-Type: multipart/form-data; boundary=asdasdasd
   >
   > Content-Length: 123123

   它表示的了本此表单数据是由多部分组成的，其中boundary=asdasd指定的是每部分内容的分界符，报文体的内容将通过在它前面添加---分割，报文结束时在它前后面加上--表示结束

   ~~~~~~~html
   <form action='/upload' method="post" enctype = 'multipart/form-data'>
   	<label for="username">Username: </label><input type="text" name="username" id="username"/>
   	<label for="file">Filename:</label> <input type='file' name="file" id='file' />
   	<input type='submit' name='submit' value="submit" />
   </form>	
   ~~~~~~~

   上面表单选择一个名为： finch.js的文件上传  构建的表单的数据如下

   ~~~~~~~~Text
   --asdasdasd\r\n
   Content-Disposition: form-data; name='username'\r\n
   \r\n
   Finch zheng\r\n
   --asdasdasd\r\n
   Content-Disposition: form-data; name='file'; filename='finch.js'\r\n
   Content-Type: application/javascript\r\n
   \r\n
   ...content of finch,js...
   --asdasdasd\r\n
   ~~~~~~~~

   













