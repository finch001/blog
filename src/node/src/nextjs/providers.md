## Providers

![provider](./img/Provider.png)

Provicer的定义稍显模糊，想要了解Provider必须对DI（Dependency injection) , 常见的Provider有 service, factor, helper 等等，都是可以通过  `constructor` 来依赖注入来获取。简单来说Provider在nextjs中的定义就是一个通过@Injectable()装饰的简单class。

>DI的定义：依赖是一个service或者对象，依赖被class所执行。DI则是一种设计模式：class需要直接使用外部的依赖而不是重新创建它。

### DI

- 创建依赖

  通常依赖只是一个普通的service factor helper 。通过注解 Injectable 来定义一个service

- 注入依赖

  我们通过注解 @Injectable来标注依赖，但是依赖创建需要通过配置 provider来告诉框架注入依赖，一般是通过构造函数来实例化依赖。

- 依赖组合

### Service

通常我们使用注解 @Injectable 来提供service

~~~~~~js
import {Injectable} from '@nestjs/common';
import {Cat} from '...';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

~~~~~~

### Dependency injecttion

依赖注入一般是用过构造函数的参数传入进来。

### Custom providers

### Optional providers

有时候可能不需要其他的依赖 我们可以使用@optional来解决这个问题

### Property-based injection

### Provider registration

我们需要告诉module 某个Service存在，通过注解@Module（{

