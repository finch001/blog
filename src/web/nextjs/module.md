## Modules
通过@Modules标注的类统称为Modules，Nest通过Module来组织程序结构
![module](./img/modules.png)
每一个程序至少拥有一个module， 根module。

@Module()接受一个对象作为参数：
- providers
  proviers被实例化后 在module中共享使用。
- controllers
  一组controllers，可以简单理解为路由handler。
- imports
  一组导入的modules的export的其他的providers。
- exports
  module自己提供了部分provider,可以被其他的Module使用。


  


