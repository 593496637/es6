# 第 08 课：完整请求生命周期

## 本课目标

- 能按顺序解释 Middleware、Guard、Interceptor、Pipe、Controller 与 Filter。
- 理解 requestId 与耗时日志为什么放在不同层。
- 知道每层适合解决什么问题，避免职责混杂。

## 心智模型

对本项目的一次 HTTP 请求，可以简化为：

```text
Middleware
  → Guard
  → Interceptor（进入）
  → Pipe
  → Controller
  → Service
  → Interceptor（返回）
  → HTTP 响应

任何适用位置抛出异常 → Exception Filter → 错误响应
```

Interceptor 像包裹调用的外壳，所以同时拥有“进入”和“返回”阶段。

## 最终项目文件导航

- `src/common/middleware/request-id.middleware.ts`：尽早建立请求关联 ID。
- `src/common/guards/jwt-auth.guard.ts`：在业务执行前验证 Bearer token。
- `src/common/interceptors/logging.interceptor.ts`：记录方法、路径、耗时和 requestId。
- `src/common/filters/http-exception.filter.ts`：最后整理异常。
- `src/common/decorators/public.decorator.ts`：向 Guard 提供公开路由元数据。
- `src/app.setup.ts`、`src/app.module.ts`：全局能力的注册位置。

## 核心讲解

Middleware 接近底层 HTTP，适合为所有请求生成/透传 requestId。Guard 回答“能否进入这个处理程序”，适合认证与授权。Pipe 只处理将要传给方法的参数。Interceptor 能在调用前后观察执行，适合耗时日志或响应转换。Filter 只在异常路径工作。

顺序影响设计：requestId 必须早于日志和错误处理生成；认证 Guard 必须早于 Controller；DTO 校验应早于 Service；Filter 必须能够读取前面附加的 requestId。

Nest 的作用域还包括全局、Controller 和方法级。同类组件的具体顺序会受注册范围影响。初学时先掌握主线，再通过日志验证项目中的实际注册顺序。

## 动手步骤与练习

1. 发送请求时添加 `x-request-id: lesson-08`，在响应头、日志、错误体中查找它。
2. 对公开登录请求和受保护的 `/auth/me` 请求比较 Guard 行为。
3. 发送一个 DTO 非法请求，判断它有没有进入 Controller/Service。
4. 画出成功请求和失败请求两条路径，并标出 Interceptor 的前后阶段。
5. 练习：把“参数校验、JWT 验证、耗时、错误格式、请求 ID”放到正确组件。

## 验收清单

- [ ] 我能不看资料写出简化生命周期顺序。
- [ ] 我能解释 Interceptor 为什么有前后两个阶段。
- [ ] requestId 能关联响应与日志。
- [ ] 我能为一个横切需求选择恰当组件。

## 常见误区

- **把所有横切逻辑放 Middleware**：它不知道最终处理方法的元数据。
- **在 Pipe 做权限查询**：Pipe 的主要职责是参数转换和验证。
- **把 Guard 当登录接口**：Guard 验证既有凭证，登录由 AuthService 完成。
- **认为 Filter 总在成功响应后执行**：它只处理异常路径。

## 下一课

生命周期骨架清楚后，下一课把端口、数据库路径、JWT 密钥等易变信息移入经过校验的配置系统。
