## 类型系统
GraphQL查询语言基本上就是关于选择对象上的字段
```js
{
    hero{
        name
        appearsIn
    }
}

返回的结果

{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
```
1. 以根对象开始
2. 选择其中的hero字段
3. 根据Hero返回的对象 选择name appearsIn字段

## 类型语言
GraphQL schema language 表示我们自己定义的查询语言。

## 对象类型和字段(type)
shcema中最基本的组件是对象类型。
```js
type Character{
    name: String!
    appearsIn: [Episode!]!
}
```
- Character表示一个GraphQL 对象类型，表示其是一个拥有一些字段的类型
- name和appearsIn 是Character类型的字段，表示任何Character都只能出现name he appearsIn字段
- String 是内置的标量类型， 标量类型是解析到单个标量对象的类型，无法在查询中对它进行次级选择。
- String! 表示这个字段是非空的
- [Episode!]! 表示是一个非空数组，数组的每一个对象都是Episode对象。

## 参数（Arguments）
GraphQL对象的每一个字段都有零个或者多个参数，例如下面的length字段：
```js
type Starship{
    id:ID!
    name: String!
    length(unit: LengthUnit = METER): Float
}
```
所有的参数都是具名的，函数接受一个有序参数列表，参数可以是必填或者选填，一般选填我们可以指定一个默认值

## 查询和变更类型 (query mutation)
Schema中大部分都是对象类型，但是一个Schema内有两个特殊类型:
```js
schema{
    query: Query
    mutation: Mutation
}

```
每一个GraphQL服务都有一个query类型，可能有一个mutation类型，这两个类型主要是GraphQL规定的，它定义了每一个GraphQL查询的入口。
```
query {
  hero {
    name
  }
  droid(id: "2000") {
    name
  }
}
```

## 标量类型 (scalar)
一个对象类型有自己的名字和字段，这些字段涉及到解析到具体数据，它们表示对应GraphQL中的叶子节点。
GraphQL默认自带了一些标量类型：
- Int 有符号32位整数
- Float 有符号双精度浮点数
- String UTF-8字符序列
- Boolean true 或者false
- ID 表示唯一标识

大部分服务器都可以自定义标量类型，我们可以定义一个Date类型：
```
scalar Date
```

然后定义如何将其序列化 反序列化 验证

## 枚举类型(enum)
枚举类型是一种特殊的标量，它限制在一个特殊的可选值集合内。
```
enum Episode{
    NEWHOPE
  EMPIRE
  JEDI
}

```

## 列表和非空([object] [object!]!)
如上 不再赘述

## 接口
一个接口是一个抽象类型，它包含某些字段，而对象类型必须包含这些字段，才能算实现了这个接口。
我们可以定义一些接口
```js
interface Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
}
```
任何实现了 `Character` 类型都需要具有这些字段 并有对应参数和返回类型
```js
type Human implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  starships: [Starship]
  totalCredits: Int
}

type Droid implements Character {
  id: ID!
  name: String!
  friends: [Character]
  appearsIn: [Episode]!
  primaryFunction: String
}
```

## 联合类型 （union）
联合类型和接口十分相似，但是它并不指定类型之间的任何共同字段。
```
union SearchResult = Human | Droid | Starship
```
表示是其中的某一种类型
任何返回一个 SearchResult 类型的地方，都可能得到一个 Human、Droid 或者 Starship

如果需要查询一个返回了 `SearchResult`联合类型的字段 需要使用条件片段来查询任意字段
```js
{
     search(text: "an") {
    ... on Human {
      name
      height
    }
    ... on Droid {
      name
      primaryFunction
    }
    ... on Starship {
      name
      length
    }
  }
}

```
` ... on Human` 表示的是如果返回的类型是Human 那么我们就取这其中的几个。

## 输入类型（input）
当我们将简单的枚举或者字符串等标量值作为参数传递给字段，如果需要传递复杂对象，这时需要使用输入类型，输入类型和常规对象一样 除了关键字是`input`而不是`type`


















