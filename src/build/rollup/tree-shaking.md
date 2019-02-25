# Tree-shaking
在所有的打包工具里面都有一个入口文件， 相当于一棵树的主干，入口文件有很多的依赖模块，相当于树枝。实际情况是，虽然依赖某个模块，但是可能只使用了其中的某些功能，通过tree-shaking，将没有使用的模块去掉。

## tree-shaking的原理
Tree-shaking的本质是消除误用的代码， Tree-shaking是DCE的一种新的实现。
Dead Code一般具有一下几个特征
- 代码不会被执行，不可到达
- 代码执行的结果不会被用到
- 代码只会影响到死变量（只写不读）

传统编译型的语言中，都是由编译器中删除，代码优化其实不是打包工具 rollup, webpack做的，而是著名的代码压缩优化工具uglify完成。

rollup vs webpack
rollup将无用的代码函数和 unused函数消除了，但是还是会默认保留不会执行到的代码，而webpack完整的保留了所有的无用代码和不会执行的代码

rollup + uglify vs webpack + uglify
默认素有的打包都去掉了无法执行的代码。

### Tree-shaking如何消除
Tree-shaking消除模块依赖于 ES6 module特点：
- 只能作为模块顶层的语句出现
- Import的模块名自能是字符串常量
- import binding是immutable的

依赖关系是确定的，和运行时的状态无关，可以进行静态分析。
`静态分析`是指不执行代码， 从字面量上对代码进行分析，CommonJS中 require一个模块，只有执行后才能知道应用的什么模块。
这也是为什么rollup和webpack都要用ES6 modulex syntax才能tree-shaking。

面向过程棉城和面向对象编程是常见的代码组织方式
- 函数消除
- 类消除

rollup webpack 的打包结果 可以去掉无用的方法。

再看下类消除实验
包中包括了menu.js的全部代码

原因如下：
- rollup只处理函数和顶层的import/export变量，没有使用到的类方法没法消除
- 因为js的动态语言的特性导致静态分析比较困难
- 副作用的代码静态分析的时候删除，可能会导致程序报错。

~~~~~~js
function Menu() {
}

Menu.prototype.show = function() {
}

Array.prototype.unique = function() {
    // 将 array 中的重复元素去除
}

export default Menu;

~~~~~~
删除menu.js 会导致Array的扩展也会被删除掉。

## 副作用导致的问题
`副作用` 一个函数会导致函数外部变量产生影响的行为。
在上面，我们讨论了纯代码在打包工具中导致的影响，在开发过程中，一般还会加上babel的转换，一些即使我们看似没有副作用的代码，也会转化为有副作用的。


~~~~~js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0,
      "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps),
    Constructor;
  };
}()

var Person = function () {
  function Person(_ref) {
    var name = _ref.name, age = _ref.age, sex = _ref.sex;
    _classCallCheck(this, Person);

    this.className = 'Person';
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  _createClass(Person, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);
  return Person;
}();
~~~~~

babel转义后的代码可能会导致一些副作用
对于babel转义后的代码可能出现副作用的是： 
1. 函数的参数若是引用类型，对于它属性的操作，都是有可能产生副作用的，因为首先他是引用类型，对它属性的任何修改其实都是改变了函数外部的数据，其次获取或者修改 它的属性，都会触发getter 或者setter，这期间都是不透明的，也会产生副作用。此时babel编译成的 `_createClass`方法为什么会有副作用就会了解到了。


##如何更好的处理tree-shaking
当我们在处理自身的资源时可行，我们跨域先进行tree-shaking打包，然后再编译成bundle文件，处理外部依赖npm包就不行，大部分npm包都经过了babel编译的，然后工程中最站空间的地方往往就是这些外部依赖包。

**webpack目前没有提供导出为ES模块的模式，所以如果你的文件经过webpack打包到一个Bundle文件后，基本这个库文件就会tree-shaking无缘了。**

目前的组件库多是将每一个组件单独打包成单独的文件或者目录，按照如下的方式来引用：
~~~~~js
import clone from 'lodash/clone';

import Button from 'antd/lib/button'

~~~~~
这样引入有个问题就是没法同时引入多个组件，所以会出现一个babel插件，使用户能够 `import {Button, Message} from 'antd'` 这样的方式来按需加载，本质也是通过插件将上一句的代码转化如下:
~~~~~js
import Button from 'antd/lib/button';
import Message from 'antd/lib/button';
~~~~~

## 总结
1. 尽量不要写带有副作用的代码，诸如编写了立即执行函数，在函数里又使用了外部变量。
2. 如果对es6语言特性不是特别严格，可以开启babel的`loose`模式，方便webpack去重。
3. 如果是开发js库，请使用rollup，并且提供ES6 module的版本。
4. JS库难以避免的产生各种副作用代码，可以将功能函数或者组件，打包成单独的文件或者目录，以便用户通过目录来加载，如果需要也可以直接开发babel插件，方便按需加载。
5. 对于第三方库使用，主要是看组件提供是否提供了3,4点的优化。
6. 可以通过uglify的一些 编译配置来优化代码删除一些强制副作用的代码。
