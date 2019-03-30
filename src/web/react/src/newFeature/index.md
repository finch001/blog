#React16新特性
## 直接返回String 数组 

- React15 只能返回一个单一组件 所以即使返回一个字符窜也需要div来包裹起来
- React16 可以返回如下五类 React elements, 数组和Fragments，Portal，String/numbers，boolean/null。

```js
export class DemoClass extends React.Component{
    render(){
        return [
            <div key="1">first element</div>,
            <div key="2">second element</div>,
        ];
    }
}
```

## ErrorBoundary (错误边界)
React 16：用于捕获子组件树的JS异常（即错误边界只可以捕获组件在树中比他低的组件错误。），记录错误并展示一个回退的UI。

捕获范围：
1. 构造树过程
2. 生命周期过程
3. 渲染期间

无法捕获范围：
1. 事件函数中，因为不在渲染期间 只能try catch
2. 异步函数
3. 服务端渲染
4. Error Boundary自身

使用范围：
1. 包裹在整个APP的外部，这样会失去了错误边界而意义。
2. 包括在子组件，这样不会影响到其他的正常显示的组件。

## react portal
用的不多

## 优化SSR
暂时没用到

## Fragemnt

React 15：render函数只能接受一个组件，所以一定要外层包一层<div>。

React16：可以通过Fragement直接返回多个组件。

```js
render(){
    return 
    <>
        <A/>
        <B/>
        <C/>
    <>
}
```
Fragemnt和数组之间的区别

- Fragment
- []
  - 数组需要每一个都表示一个key
  - 字符串需要双引号
  - 每一个都需要逗号区分

## 新的生命周期
即将废弃的生命周期  componentWillMount componentWillUpdate componentWillReceiveProps
新增了一个新的生命周期 getDerivedStateFromProps

## 新的Context
暂时没有用到  新的redux使用的这个Context

## createRef
直接获取组件实例
1. 用于操作focus, text 选择，media playback
2. 触发即时动画
3. 与第三方组件结合

```js
class MyComponent extends React.Component {
  constructor(props) {
 super(props);

 this.inputRef = React.createRef();
  }

  render() {
 return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
 this.inputRef.current.focus();
  }
}

```

## forwardRef
```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
forwarRef方法会将父组件的实例传递给子组件 这样父组件就可以直接操作子组件的实例
如上  ref会通过React.forwardRef的第二个参数直接传入到子组件中 这样父组件的ref就可以直接操作button

## strictMode component
<React.strictMode> 不会渲染任何Element，只有在development模式下才能用。

```js
function ExampleApplication() {
 return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

1. 识别出使用不安全生命周期的组件
2. 对使用string ref进行告警
3. 对使用findDOMNode进行告警
4. 探测某些产生副作用的方法
5. 对使用弃用context API进行警告










