## RESTful

REST的全程是Representational State Transfer，中文含义为表现层状态转化。符合RESTful规范的设计，我们称之为RESTful设计。它的设计哲学是将服务器提供的内容实体看做一个资源，并表现在URL上。

举个栗子

我们有一个用户地址的如下

> /user/finch

这个地址代表了一个资源，对这个资源的操作，主要体现在HTTP请求方法上，过去我们对用户的增删改查的API设计的URL可能如下

> POST  /user/add?username=finch
>
> GET /user/remove?username=finch
>
> POST /user/update?username=finch
>
> GET /user/get?username=finch

操作行为体现在url上，主要用的请求方法是POST和GET方法。

如果按照RESTful设计url

> POST  /user/finch
>
> DELETE /user/finch
>
> PUT /user/finch
>
> GET /user/finch

RESTful的具体设计规则表现为： 通过URL设计资源、请求方法定义资源的操作、通过Accept决定资源的表现形式。
