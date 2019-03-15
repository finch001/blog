1. 函数可以与数字一样被存储为变量
   const sum = () => 42
2. 函数可以和数字一样被存储在数组里面
   const array = [32, function(){return 42}]
3. 函数可以和数字一样作为对象的成员变量
   const sum = {number:42, fun: function(){return 42}}
4. 函数可以和数字一样在使用时直接创建出来
   42 + (function(){return 42})()
5. 函数可以和数字一样被传递给另外一个函数
   function weridAdd(n, f){ return n + f()}
6. 函数可以被另外一个函数返回
   
