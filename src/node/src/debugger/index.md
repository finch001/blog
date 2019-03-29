#Node debugger
Node.js 包括一个进程外的调试实用程序，可通过V8检查器和内置调试客户端访问。 要使用它，请使用 inspect 参数启动 Node.js，然后使用要调试的脚本的路径。 将显示一个提示，表明调试器成功启动：

~~~js
$ node inspect myscript.js
< Debugger listening on ws://127.0.0.1:9229/80e7a814-7cd3-49fb-921a-2e02228cd5ba
< For help, see: https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in myscript.js:1
> 1 (function (exports, require, module, __filename, __dirname) { global.x = 5;
  2 setTimeout(() => {
  3   console.log('world');
debug>
~~~

Node.js 的调试器客户端不是一个功能齐全的调试器，但可以进行简单的步骤和检查。

## Node调试常见命令
- node --inspect index.js 以debugger模式启动index.js
- node --inspect=9229 index.js  以debugger模式启动index.js 端口是9229
- node --inspect-brk index.js 以debugger模式启动index.js 自动在第一行停止

## Node常见调试方法
### VsCode客户端调试




### 浏览器调试
V8 检查器集成允许将 Chrome 开发者工具附加到 Node.js 实例以进行调试和性能分析。 它使用 Chrome开发者工具协议。

~~~~js
$ node --inspect index.js
Debugger listening on 127.0.0.1:9229.
To start debugging, open the following URL in Chrome:
 chrome-devtools://devtools/bundled/js_app.html?experiments=true&v8only=true&ws=127.0.0.1:9229/dc9010dd-f8b8-4ac5-a510-c1a114ec7d29
~~~~

(上面末尾的UUID dc9010dd-f8b8-4ac5-a510-c1a114ec7d29 是动态生成的，它在不同的调试回话中会有不同)
如果 Chrome 浏览器的版本低于 66.0.3345.0，请在上述网址中使用 inspector.html 而不是 js_app.html。


