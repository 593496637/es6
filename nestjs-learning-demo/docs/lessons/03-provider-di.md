# 第 03 课：Provider 与依赖注入

## 本课目标

- 理解 Provider、Service 和 Nest IoC 容器的关系。
- 看懂构造器注入，知道实例由谁创建。
- 能把 HTTP 细节与可测试的业务逻辑分开。

## 心智模型

Controller 不 `new TasksService()`。它只声明“我需要 TasksService”，模块注册提供者，Nest 容器负责创建并注入实例。

```text
TasksModule 注册 TasksService
        ↓ 容器解析依赖
TasksController constructor(tasksService)
        ↓
调用业务用例
```

这种控制权反转让实现可替换：测试时可注入 fake，持久化阶段可注入 TypeORM Repository，而 Controller 无需改变。

## 最终项目文件导航

- `src/modules/tasks/tasks.service.ts`：任务用例与业务规则。
- `src/modules/tasks/tasks.controller.ts`：通过构造器使用 Service。
- `src/modules/tasks/tasks.module.ts`：Provider 注册位置。
- `src/modules/projects/projects.service.ts`：项目用例。
- `src/modules/users/users.service.ts`：用户查询与创建能力。

## 核心讲解

Provider 是可由 Nest 容器管理的依赖。`@Injectable()` 表明类可参与依赖注入；模块的 `providers` 决定它在什么范围内可解析。Service 是 Provider 的常见角色名称，不是特殊运行机制。

构造器参数既是依赖声明，也是设计信号。如果一个 Service 注入十几个依赖，通常说明职责过多。循环依赖则常提示模块边界或调用方向不清，不应把 `forwardRef()` 当默认解决方案。

默认 Provider 通常是单例作用域，因此不要把“当前请求用户”“本次查询结果”等可变请求状态放在实例字段中。把这些数据作为方法参数传入更清晰安全。

## 动手步骤与练习

1. 从 TasksController 构造器找到 TasksService，再找到它的注册模块。
2. 列出 TasksService 的全部依赖，并为每个依赖写一句职责。
3. 选择一个 Controller 方法，划掉 HTTP 装饰器后判断 Service 是否仍可独立调用。
4. 练习：为 TasksService 设计一个最小 fake，思考测试为何不需要启动服务器。
5. 练习：解释 `new TasksService(...)` 写在 Controller 内会损失哪些能力。

## 验收清单

- [ ] 我能指出谁注册、谁解析、谁消费一个 Provider。
- [ ] 我能解释依赖注入为何提高可替换性和可测试性。
- [ ] 我不会在单例 Service 实例字段保存请求级状态。
- [ ] 我能区分“Service”这一架构角色与“Provider”这一容器概念。

## 常见误区

- **只加 `@Injectable()` 不注册**：容器仍不知道从哪个模块提供它。
- **手工 new 依赖**：绕过了容器，也让测试替换困难。
- **跨模块直接引用内部 Provider**：需要由提供方 export、使用方 import。
- **把 DI 当全局变量**：依赖仍应有清晰方向与最小职责。

## 下一课

Provider 需要一个清晰的注册和可见性边界；下一课深入 Module 如何组织领域并控制依赖方向。
