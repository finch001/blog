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
VSCode 默认内置了Node.js的debugging。
#### Launch configurations
VSCode通过将 `.vscode ` 调试的配置配置在launch.json来调试代码。
~~~json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${file}"
        }
    ]
}
~~~

#### Launch versus attach configurations
request: Launch 和 Attach 是两种不同的debug工作流方式
- Launch
  比较适合服务端开发，一般vscode编辑器则是通过这种方式来调试代码
- Attach
  比较适合浏览器开发，通过将DevTools对接到打开的浏览器来调试代码 

####Launch.json配置文件
- type  eg: node php go
- request  launch attach
- name debug的名字
一些有用的参数
- program 启动的程序入口 `"${workspaceFolder}/app.js"`
- args 启动程序的参数 `{ "NODE_ENV": "develop" }`
- env 环境变量 默认是null
- cwd 当前的工作目录 一般使用 `${workspaceRoot}`
- port debug运行时的端口
- console 使用什么console  `internalConsole, integratedTerminal, or externalTerminal`




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


