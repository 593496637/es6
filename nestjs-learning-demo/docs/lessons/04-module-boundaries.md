# 第 04 课：Module 与领域边界

## 本课目标

- 理解 `imports`、`controllers`、`providers`、`exports` 的区别。
- 知道为什么按业务领域组织文件比按技术类型堆放更易维护。
- 能从 AppModule 画出 TaskFlow 的模块依赖图。

## 心智模型

Module 既是装配单元，也是可见性边界。默认情况下，Provider 只在声明它的模块中可用；需要跨边界协作时，由提供方明确 export，消费方明确 import。

```text
AppModule
 ├─ AuthModule → UsersModule
 ├─ ProjectsModule
 ├─ TasksModule → ProjectsModule
 └─ HealthModule
```

箭头表示“使用对方公开能力”，不是随意访问对方所有内部文件。

## 最终项目文件导航

- `src/app.module.ts`：应用级组合根。
- `src/modules/auth/auth.module.ts`：认证能力及其依赖。
- `src/modules/users/users.module.ts`：用户领域公开能力。
- `src/modules/projects/projects.module.ts`：项目领域装配。
- `src/modules/tasks/tasks.module.ts`：任务领域装配。
- `src/modules/health/health.module.ts`：健康检查装配。

## 核心讲解

四个常见元数据的职责：

- `imports`：本模块需要使用哪些模块导出的能力。
- `controllers`：哪些 HTTP 入口属于本模块。
- `providers`：哪些依赖由本模块容器管理。
- `exports`：本模块允许其他模块使用哪些 Provider。

根模块应保持“组合根”角色。业务模块按 `auth/users/projects/tasks/health` 划分，是因为同一业务概念的 Controller、Service、DTO、Entity 往往一起变化。若按全局 `controllers/`、`services/` 分类，修改一个功能会在多个远距离目录来回跳转。

模块边界不是数据库表的简单一一映射，也不是越细越好。边界应围绕内聚能力：Auth 负责签发和验证身份，Users 负责用户数据，Projects 负责项目所有权，Tasks 负责项目内任务。

## 动手步骤与练习

1. 从 `AppModule.imports` 画出所有一级模块。
2. 为每个业务 Module 做四列表：imports/controllers/providers/exports。
3. 找到一个跨模块调用，说明提供方为何需要 export。
4. 练习：如果 TasksModule 需要用户信息，比较“导入 UsersModule”与“直接跨目录读取 UsersRepository”。
5. 练习：判断 Pagination DTO 应属于 TasksModule 还是 `src/common`，写出你的依据。

## 验收清单

- [ ] 我能准确解释 Module 四类元数据。
- [ ] 我能画出最终项目的模块依赖关系。
- [ ] 我知道 export 是公开 Provider，不是导出文件语法。
- [ ] 我能识别根模块中不应出现的业务规则。

## 常见误区

- **把所有 Provider 都 export**：会使模块没有真正边界。
- **把所有东西放进 AppModule**：短期省事，长期依赖关系失控。
- **模块之间互相 import**：通常反映职责或调用方向需要重新设计。
- **混淆 ES module 与 Nest Module**：前者是语言级文件系统，后者是运行时 DI 组织单元。

## 下一课

有了 Controller、Service、Module，下一课先用内存 CRUD 看清业务闭环，再抽象出可替换的 Repository 边界。
