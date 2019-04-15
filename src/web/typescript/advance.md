## 类型别名 （type）
类型别名用来给一个类型起一个新名字。

### 简单的例子
```js
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```
使用 type 关键字 创建类型别名
类型别名常用与联合类型。

## 字符串字面量类型  (type)
字符串字面量类型用来约束取值只能是某几个字符串中的一个
```js
type EventNames = 'click' | 'scroll' | 'mousemove'
```
通过定义 `EventNames`类型 我们只能选用其中了几个字符串来作为选择。

## 元祖

## 枚举 (enum)
枚举使用 `enum` 关键字来定义:
```js
enum Days = {Sun, Mon, Tue, Wed,Thu, Fri, Sat};
```
枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

## 类
TODO

## 类与接口



