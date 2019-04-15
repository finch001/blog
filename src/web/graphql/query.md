## 字段
查询可以是字符串类型，也能指代对象类型，这个时候可以对这个对象的字段进行次级选择。
``` GraphQL 
{
  hero {
    name
    # 查询可以有备注！
    friends {
      name
    }
  }
}
```
``` GraphQL
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "friends": [
        {
          "name": "Luke Skywalker"
        },
        {
          "name": "Han Solo"
        },
        {
          "name": "Leia Organa"
        }
      ]
    }
  }
}
```

name中直接返回的是字符串。
friends中返回的是一个数组对象，所以可以对象中取某一个字段返回。
我们可以通过Schema所指示的内容来预测将会得到哪一种。

## 参数
我们不只仅仅是便利对象以及其字段，GraphQL还支持字段传递参数的能力
```js
{
  human(id: "1000") {
    name
    height
  }
}
```
类似REST的系统中，你只能传递一组简单参数--请求中的query参数和URL段。但是在GraphQL中，每一个字段和嵌套对象都能有自己的一组参数。还可以通过给标量（scalar）字段传递参数，用于实现服务端的一次转换，而不用每一个客户端分别转换。

## 别名
如果需要将一个数据返回两次，但是每一个的返回的数据都不一样，需要使用别名来重命名字段。
```js
{
  empireHero: hero(episode: EMPIRE) {
    name
  }
  jediHero: hero(episode: JEDI) {
    name
  }
}
```
查询返回的数据有两个hero，明显出现了重叠的情况，这时候需要我们使用别名  empireHero: hero 和   jediHero: hero

## 片段 （Fragments）
对于一些比较复杂的页面，可以需要的数据比较的复杂，片段可以组织字段，然后在需要它们的地方引入，
```js
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```
## 在片段中使用变量
```
query HeroComparison($first: Int = 3) {
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  friendsConnection(first: $first) {
    totalCount
    edges {
      node {
        name
      }
    }
  }
}
```

## 操作名称
一般包括两种 操作类型和操作名称
```
query HelloWorld{
    hero{
        name 
        friends {
            name
        }
    }
}
```

操作类型只有三种: query mutation subscription 三种
操作名称是你的操作的有意义和明确的名称，简单理解为查询函数名称

## 变量
使用变量前，
1. 使用 `$variableName` 替代查询中的静态值
2. 声明 `$variableName` 为查询接受的变量之一
3. 将 `$variableName:value` 通过传输专用的分离的变量字典中。

```js
# { "graphiql": true, "variables": { "episode": JEDI } }
query HeroNameAndFriends($episode: Episode) {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

## 变量定义
变量定义看上去如下 `($episode: Episode)` 变量前缀为$ 后跟其类型。
## 默认变量
可以指定类型定义后面附带默认值的方式，将默认值赋给变量
```js
query HeroNameAndFriends($episode: Episode = "JEDI") {
  hero(episode: $episode) {
    name
    friends {
      name
    }
  }
}
```

## 指令
目前GraphQL包含两个指令：
- @include (if: boolean) 仅在参数为true时，包含此字段
- @skip (if: boolean) 仅在参数为 true 时，跳过此字段

## 变更
GraphQL大部分讨论的时数据获取，但是也需要修改数据
```js
mutation CreateReviewFor($ep: Episode!, $review: ReviewInput! ){
    createReview(episode: $ep, review: $review){
        starts
        commentary
    }
}

## 变量
{
    "ep": "JEDI",
    "review": {
        "starts": 5,
        "commentart": "this is a great movie"
    }
}

```
传递的变量review也不是一个标量，而是一个输入对象类型，

### 变更中的多个字段
一个变更也能包含多个字段，一如查询。查询和变更区别在于：

**查询字段时并发执行的，而变更字段时线性执行，一个接着一个。**

## 内联片段
如果查询的字段返回的时接口，那么你可能需要使用内联片段来去除下层具体类型的数据

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
```
你需要使用一个类型条件内联片段。因为第一个片段标注为 ... on Droid，primaryFunction 仅在 hero 返回的 Character 为 Droid 类型时才会执行。同理适用于 Human 类型的 height 字段。


















