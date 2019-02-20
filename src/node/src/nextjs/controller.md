## Controllers

![constroll](./img/controllers.png)

controllers 对处理  到来` request` 然后返回 ` responses` 到客户端。

一个 controllers 目的是接受特定的请求， Controller 满足路由匹配， 通常是一个controller对应了多个路由，每一个路由执行不同的操作。

### 路由

使用装饰器 ` @Controller()` 并指定一个可选的前缀 ` cats`，使用同一个前缀可以减少重复相同路由前缀

~~~~~~js
import {Controller, Get} from '@nestjs/common'

@Controller('cats')
export class CatsController{
    @Get()
    findAll(){
        return 'This Action returns all cats';
    }
}
~~~~~~

`@Get` ` @Controller('cats')` 映射了 路由 ` /cats ` GET 请求

Controller 响应 res 有两种模式： 

| 标准   | 当我们返回一个JS对象或者数组，会自动被序列化为JSON，如果返回的是字符串则不会序列化，默认的状态码是200，POST默认返回的状态码是201 ,我们也可以指定特定的状态码 @HttpCode（...） |
| ------ | ------------------------------------------------------------ |
| 自定义 | 我们也可以自定义 返回的response object 通过使用@Res          |

###  Request Object

当很多的请求需要获取 client request的详细数据的时候，框架提供了装饰器方法获取 ` @Request()`

~~~~~js
import {Controller, Get, Req} frpm '@nextjs/common'

@Controller('cats')
export class CatsController{
    @Get()
    findAll(@Req() request){
        return 'This action returns all Cats';
    }
}

~~~~~

装饰器方法

- @Request()   req
- @Response()  res
- @Next()  next
- @Session()  req.session
- @Param(param?: string ) req.params / req.params[ param ]
- @Body(param?: string) req.query / req.query[param]
- @Query(param?: string)  req.query / req.query[param] 
- @Headers(param?: string) req.headers / req.headers[param]

### 路由匹配

字符串匹配

- +1次 或者多次

- ？ 0次 1次
- *0次1次或者多次

~~~~~js
@Get('ab*cd')
findAll(){
    return 'This route uses a wildcard';
}
~~~~~

### 状态码

默认返回的状态码都是200，除了post默认是201，通过 `@HttpCode()` 可以指定某一个的状态码。

也可以通过注入@Res 来手动指定状态码当出现错误或者异常的时候。

~~~~~js
@Post()
@HttpCode(204)
create(){
    return 'This action add new Cats';
}
~~~~~

### 头部

当通过@Header() 或者注入@Res来指定头部

~~~~~~js
@Post()
@Header('Cache-Control', 'none')
create(){
    return 'This action add new Cats'
}
~~~~~~

### 路由参数

读取路由上面的动态数据参数

~~~~~~~js
@Get(':id')
findOne(@Param() params){
    console.log(params.id);
    return `This action returns #${params.id} cat`;
}

@Get('id')
findOne(@Param('id') id){
    return `This action return a #${id} cat`;
}

~~~~~~~

### 异步处理

每一个异步方法都必须返回一个 `Promise` 对象，它意味着你可以返回一个延迟的数据。

路由handler还可以处理 Rx observable stream, Next会自动订阅source 并且在stream完成的时候获取最后一个发生的数据

~~~~~~
@Get()
async findAll(): Promise<any[]>{
    return []
}

@Get()
findAll: Observable<any[]>{
    return of([])
}


~~~~~~

### 请求负载

当需要上传数据的时候，我们会用到 `@Body()` 参数，首先我们需要决定DTO（Data Transfer Object） 一个DTO决定了数据如何在网络上传输。我们可以使用 ` TypeScript`的接口特性或者简单的Class 来处理DTO，但是在Next框架的情况下还是建议使用**class**, 因为 TypeScript最后在编译的时候会被转移成普通对象，如果是 `class` 在处理 Pipes会更有帮助

~~~~~js
// create-cat.dto.ts
export calss CreateCatDto{
    readonly name: string;
    readonly age: number;
    readonly breed: string;
}

@Post（）
async create(@Body() createCatDto: CreateCatDto){
    return 'this Action adds a new cat';
}
~~~~~

### 错误处理

### 自定义处理

~~~~~~
import{} from '@nextjs/common';

@Controller('cats')
export calss CatsController{
    @Post()
    create(@Res() res){
        res.status(HttpStatus.CREATED).send()
    }
    
    @Get()
    findAll(@Res() res){
        res.status(HttpStatus.OK).json([]);
    }
}
~~~~~~









 