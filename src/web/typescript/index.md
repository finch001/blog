## any类型
默认typescript的对象和基本类型都是有类型的，但是 Any 用来表示任意类型

## 类型推导
如果没有明确的指定类型，那么typescript会依照类型推导的规则来推断出一个类型
### 如何类型推导
```js
let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
实际上类型推导主要是通过右赋值的方式来推导出
```js
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
```
> 如果在定义变量的时候没有赋值，不管之后有没有赋值，都会被推断成 `Any` 类型而完全不会被类型检查

## 联合类型
联合类型 (Union Types) 表示取值可以为多种类型中的一种。
```js
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```
联合类型使用 | 分隔每个类型。

### 访问联合类型的属性或者方法
当typescript不确定一个联合类型的变量，只能访问此联合类型 的所有类型里共有的属性或者方法。

联合类型的变量在被赋值的时候，会根据类型推到的规则推断出一个类型。

## 对象的类型--接口
在typescript中，我们使用 (interface)来定义对象的类型

### 何为接口
在面向对象编程中，我们使用接口这个抽线过的概念，它是对行为的抽象，具体的实现则是有类(class)来实现。
在Typescript中的接口是一个非常灵活的概念，除了可以对类的一部分行为进行抽象之外，也常用于对对象的形状(shape)进行描述

### 可选属性
```js
interface Person{
    name: string;
    age?: number;
}

```

### 任意属性
```js
interface Person{
    name: string;
    age?: number;
    [propName:string]:any;
}

```
使用 [propName: string] 定义了任意属性取 string 类型的值。

### 只读属性
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
```js
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```
只读属性的约束在于对象初始化完成之后，对对象第一次赋值的时候。

## 数组的类型
一般使用 [类型 + 方括号] 来表示数组:
```js
let list: number[] = [1,2,3,1,1,1];
```
### 使用 any 在数组中的应用
一种常见的用法是使用 any 来表示任意类型的数组
```js
let list:any[] = ['finch', 123, {website: 'baidu.com'}]
```
### 类数组
类数组不是数组类型，比如 `arguments `
常见的类数组都有自己的接口定义，比如 `IArguments` `NodeList` `HTMLCollection`等

## 函数的类型
在JavaScript中，有两种常见的定义函数的方式--函数声明和函数表达式
```js
// 函数声明（Function Declaration）
function sum(x, y) {
    return x + y;
}

// 函数表达式（Function Expression）
let mySum = function (x, y) {
    return x + y;
};
```
一个函数有输入和输出，在TypeScript中进行约束，需要把输入和输出都考虑到，其中函数声明定义较为简单:
```js
function sum(x: number, y: number): number {
    return x + y;
}
```
输入多余或者少于的参数都是不被允许的，这一点和原始JS的宽松要求不太一样。

### 接口来定义函数的类型
``` js
interface SearchFunc {
    (source:string, subString: string) : boolean
}

let mySearch:SearchFunc;
mySearch = function(source: string, subString: string){
    return source.search(subString) !== -1;
}

```

### 可选参数
输入多余的参数是不被允许的。那么如何定义可选的参数呢
我们使用 `？` 表示可选的参数：
```
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

**可选参数必须放在必需参数后面，换句话说，可选参数后面不允许再出现必选参数**

### 参数默认值
参数名后面 ` = `
```js
function buildName(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}
```
### 剩余参数
可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）

```js
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}
```

## 重载
重载允许同一个函数名接口不同数量或者类型的参数，作出不同的处理。


## 类型断言
类型断言用来手动指定一个值的类型
语法
```
<类型> 值

```
有时候联合类型我们无法确定变量，我们需要类型断言一个值的类型，因为只有这样才能访问到特定类型的属性或者方法。

> 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：

## 声明文件
暂时不处理

## 内置对象
### ECMAScript 标准提供的内置对象有:
Boolean Error Date RegExp
### DOM 和 BOM 的内置对象

### TypeScript 核心库的定义文件
TypeScript定义了所有浏览器环境和标准的ECMAScript的声明文件

### 用TypeScript写Node.js
Node.js 不是内置对象的一部分，如果想要使用TypeScript写Node.js
需要引入第三方声明文件:
```js
npm install @types/node --save-dev
```

