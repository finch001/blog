## queryString

` queryString` 模块提供用于解析和格式化URL查询字符串的使用工具。 它可以使用一下方式访问： 

~~~~~js
const queryString = require('queryString');
~~~~~

- querystring.escape(str)

  以URL查询字符串的特定要求进行了优化的方式对象的str 执行URL百分比编码，通常不直接使用，一般都是在querystring.stringify()使用。

- querystring.parse(str, sep, eq, options)

  - str  需要解析的URL查询字符串
  - sep 分隔键值对的子字符串 默认是 `&`
  - eq  分隔键和值的子字符串 默认值 `=`
  - options 
    - ` decodeURIComponent` <Function> 解析查询字符串中的百分比编码字符串使用的函数
    - ` maxKeys` 指定要解析的键的最大数量 默认值：1000

  例如，查询字符串 ` foo=bar&abc=xyz&abc=123` 被解析为： 

  ~~~~json
  ｛
  	foo: 'bar',
  	abc: ['xyz', '123']
  ｝
  ~~~~

  querystring.parse()方法返回的对象不是原型继承自JavaScript  ` object`  默认查询字符串中的百分比编码使用UTF-8编码，如果使用其他字符编码，需要指定decodeURIComponent 选项：

  

- querystring.stringify(obj , sep, eq, options) 

  - obj 需要序列化为URL查询字符串的对象
  - sep 分隔键值对的子字符串 默认是 `&`
  - eq 分隔键和值的子字符串 默认值 `=`
  - options
    - encodeURIComponent 在查询字符串中将URL 不安全字符串转化为百分比编码时使用的函数， 默认值： querystring.escape()

  querystring.stringigy() 序列化传入 ` obj ` 中的以下类型的值： <string> | <number> | <string[]> | <boolean> | <number [] > | <boolean [] >

- querystring.unescape(str)

  在给定的str上执行URL百分比编码字符的解码。一般不直接使用，都是在querystring.parse()中使用。

