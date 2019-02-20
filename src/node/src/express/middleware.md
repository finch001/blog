## 中间件

Express 是一个自身功能极简, 完全是由路由和中间件构成一个的 web 开发框架：**从本质上来说，一个 Express 应用就是在调用各种中间件。**

对于web应用来说，我只需要关注与业务逻辑，有时候不需要接触到这么多细节性的处理。为此我们需要引入中间件来简化和隔离这些基础设施与业务逻辑之间的细节。让开发者关注在业务的开发上。

中间件的行为比较类似Java中过滤器的工作原理，就是在进入具体的业务处理之前，先让过滤器处理。

Express关于中间件采用的是connect的设计，通过尾触发的方式实现。，一个基本的中间件会是如下的形式：

~~~~~~js
var middleware = function(req, res, next){
    // todo
    next()
}
~~~~~~

![Screen Shot 2018-06-15 at 2.50.26 PM](/Users/finch/Desktop/Screen Shot 2018-06-15 at 2.50.26 PM.png)

Express应用可使用如下几种中间件：

- 应用级中间件

  应用级中间件绑定到APP对象，使用app.use()和app.METHOD(),其中，METHOD是需要处理的HTTP请求的方法

  ~~~~~~js
  var app = express()
  
  // 没有挂载路径的中间件，应用的每个请求都会执行该中间件
  app.use(function(req, res, next){
      console.log('Time ', Date.now())
      next();
  })
  
  // 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
  app.use('/user/:id', function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });
  
  // 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
  app.get('/user/:id', function (req, res, next) {
    res.send('USER');
  });
  ~~~~~~

  下面例子展示了一个挂载点装载一组中间件

  ~~~~~~js
  // 一个中间件栈，对任何指向 /user/:id 的 HTTP 请求打印出相关信息
  app.use('/user/:id', function(req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  });
  
  ~~~~~~

- 路由级中间件

  路由级中间件和应用级中间件一样，只是它绑定的对象为express.Router()

  ~~~~~~js
  var router = express.Router()
  
  // 没有挂载路径的中间件，通过该路由的每个请求都会执行该中间件
  router.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
  });
  
  // 将路由挂载至应用
  app.use('/', router);
  ~~~~~~

- 错误处理中间件

  错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其签名如下： `(err, req, res, next)`。

  ~~~~~js
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  ~~~~~

  为了便于组织（更高级的框架），您可能会像定义常规中间件一样，定义多个错误处理中间件。比如您想为使用 XHR 的请求定义一个，还想为没有使用的定义一个，那么：

  ~~~~~~js
  var bodyParser = require('body-parser');
  var methodOverride = require('method-override');
  
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
  ~~~~~~



  #### 缺省错误处理句柄

  Express 内置了一个错误处理句柄，它可以捕获应用中可能出现的任意错误。这个缺省的错误处理中间件将被添加到中间件堆栈的底部。**最后错误将被连同堆栈追踪信息一同反馈到客户端。堆栈追踪信息并不会在生产环境中反馈到客户端。**

  比如当你向res写入数据的时候，这时候调用Next并传入一个error，Express 内置的缺省错误处理句柄将帮你关闭连接并告知 request 请求失败。











