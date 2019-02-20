## handlebars

>  **我个人正在写Node.js的系列学习笔记[node-learning-manual](https://github.com/finch001/node-learning-manual)**，包含了Node.js的基本模块和工程化相关的知识, 如果对你有帮助，请点个start，您的支持是对我最大的鼓励。



### 开始

Handlebars 模板看上去和html没有什么区别，除了嵌入了hanlebars的表达式

~~~~~~~html
<div>
    <h1>
       {{title}} 
    </h1>
    <div>
        {{body}}
    </div>
</div>
~~~~~~~

handlebars表达式是 ` {{ 一些内容  }}`

通过嵌入如下数据

~~~~~~Js
const template = require('Handlebars').template;

var context = {title: 'My new Post', body: "This is my first post!"}
var html = template(context)
~~~~~~

 html会生成的结果

~~~~~~~
<div>
    <h1>
       My new Post
    </h1>
    <div>
        This is my first post!
    </div>
</div>
~~~~~~~

### HTML 逃逸

Html中嵌入的数据是通过{{}} **两个花括号**包裹的， 如果想要嵌入的值不需要改变则直接使用 **三个花括号**

~~~~~~~
<div>
    <h1>
       {{title}} 
    </h1>
    <div>
        {{{body}}}  // 这里的Body会直接嵌入
    </div>
</div>
~~~~~~~

### 块级表达式

块级表达式允许你定义一个Helper函数用不同的上下文（context） 来触发 模板的一部分。 块级表达式定义如下 ` {{# <help-name> }}   {{/ <help-name>}}

举一个helper 用来生成 HTML list:

~~~~~~~~
{{#list people}} {{firstName}} {{lastName}} {{/list}}
~~~~~~~~

我们需要嵌入的数据如下：

~~~~~~~json
{
    people: [
     {firstName: 'Finch', lastName: 'Zheng'},   
     {firstName: 'wu', lastName: 'kong'},
     {firstName: 'Alan', lastName: 'Json'}
    ]
}
~~~~~~~

首先我们创建一个helper函数 list 用来生成HTML list，  helper函数接受people作为第一个参数，第二个参数为options， options中有一个方法fn, 可以用来触发 `{{firstName}} {{lastName}}` 这一部分模板

~~~~~~js
HandleBars.registerHelper('list', function(items, options){
    var out = '<ul>'
    
    for(let i = 0; i < items.length; i++){
        out = out + '<li>' + options.fn(items[i]) + '</li>';
    }
    return out + '</ul>'
})
~~~~~~

当我们编译这个模板的时候，加入我们的数据，生成的html如下：

~~~~~~Html
<ul>
	<li>Finch Zheng</li>
    <li>wu kong</li>
    <li>Alan Json</li>
</ul>
~~~~~~

### HandleBars 路径

handlebars支持简单的路径

~~~~~html
<p>{{Name}}</p>
~~~~~

> Handlebars 也支持嵌套路径，当需要在当前上下语境下找到嵌套的数据的时候
>
> ~~~~~~Html
> <div>
> 	<h1>
>         {{title}}
>     </h1>
>     <h2>
>         By {{author.name}}
>     </h2>
> </div>
> ~~~~~~
>
> 我们的模板数据是
>
> ~~~~~~js
> var context = {
>     title: "My first blog"
>     authot: {
>         name: 'Finch'
>     }
> }
> ~~~~~~
>
> 出了向下寻找路径，handlebars还支持向上去寻找路径
>
> ~~~~~~
> {{permalink}}
> {{#each comments}}
>   {{../permalink}}
> 
>   {{#if title}}
>     {{../permalink}}
>   {{/if}}
> {{/each}}
> ~~~~~~

### 模板的注释

我们使用 {{!-- -- }} 或者 {{!    }} 来表示注释

~~~~~~~html
<div class="entry">
  {{! This comment will not be in the output }}
  <!-- This comment will be in the output -->
</div>
~~~~~~~

### Helpers

我们可以使用 `Handlebars.registerHelper` 方法来自定义Helper方法， 注册后的helper方法可以在任意的模板中使用

~~~~~~~~html
<div class="post">
  <h1>By {{fullName author}}</h1>
  <div class="body">{{body}}</div>
</div>
~~~~~~~~

注册我们自定的Helper函数和数据后

~~~~~~js
var context = {
  author: {firstName: "Alan", lastName: "Johnson"},
  body: "I Love Handlebars",
};

Handlebars.registerHelper('fullName', function(person) {
  return person.firstName + " " + person.lastName;
});
~~~~~~

输出的Html如下

~~~~~~
<div class="post">
  <h1>By Alan Johnson</h1>
  <div class="body">I Love Handlebars</div>
</div>
~~~~~~

###  字面表达式

Helper函数也可以接受字面表达式的数据，支持的数据类型包括： `numbers` `strings` `true` `false` `null` `undefined`

~~~~~~handlebars
{{agree_button "My Text" class="my-class" visible=true counter=4}}
~~~~~~

### [内置helper](http://handlebarsjs.com/builtin_helpers.html)

Handlebars 提供了非常多的内置的Helper比如 `if`  `each` 等等

### [API Reference](http://handlebarsjs.com/reference.html)









 





